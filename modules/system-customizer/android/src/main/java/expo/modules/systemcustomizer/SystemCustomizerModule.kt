package expo.modules.systemcustomizer

import android.app.WallpaperManager
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.Shader
import android.net.Uri
import android.os.Build
import expo.modules.kotlin.Exceptions
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.max
import kotlin.math.sin

/**
 * Thin wrapper around PUBLIC Android APIs only:
 *  - WallpaperManager (setBitmap with FLAG_SYSTEM / FLAG_LOCK, API 24+)
 *  - Settings intents (startActivity)
 * Nothing here needs root or signature-level permissions.
 */
class SystemCustomizerModule : Module() {
  private val context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() = ModuleDefinition {
    Name("SystemCustomizer")

    Function("getCapabilities") {
      val wm = WallpaperManager.getInstance(context)
      mapOf(
        "sdkInt" to Build.VERSION.SDK_INT,
        "androidVersion" to Build.VERSION.RELEASE,
        "manufacturer" to Build.MANUFACTURER,
        "brand" to Build.BRAND,
        "model" to Build.MODEL,
        "wallpaperSupported" to wm.isWallpaperSupported,
        "wallpaperSetAllowed" to wm.isSetWallpaperAllowed
      )
    }

    Function("canOpen") { action: String ->
      Intent(action).resolveActivity(context.packageManager) != null
    }

    Function("openSettings") { action: String ->
      openSettingsAction(action)
    }

    AsyncFunction("setWallpaperFromUri") { uri: String, target: String ->
      val (w, h) = targetSize()
      val source = decodeSampled(uri, w, h)
      val bitmap = centerCrop(source, w, h)
      applyBitmap(bitmap, target)
    }

    AsyncFunction("setGradientWallpaper") { colors: List<String>, angle: Double, target: String ->
      if (colors.size < 2) {
        throw CodedException("ERR_INVALID_COLORS", "At least two colors are required", null)
      }
      val parsed = try {
        colors.map { Color.parseColor(it) }.toIntArray()
      } catch (e: IllegalArgumentException) {
        throw CodedException("ERR_INVALID_COLORS", "Invalid color value", e)
      }
      val (w, h) = targetSize()
      applyBitmap(renderGradient(parsed, angle, w, h), target)
    }
  }

  private fun openSettingsAction(action: String): Boolean {
    val intent = Intent(action)
    if (intent.resolveActivity(context.packageManager) == null) return false
    return try {
      val activity = appContext.currentActivity
      if (activity != null) {
        activity.startActivity(intent)
      } else {
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(intent)
      }
      true
    } catch (e: Exception) {
      false
    }
  }

  private fun targetSize(): Pair<Int, Int> {
    val wm = WallpaperManager.getInstance(context)
    val m = context.resources.displayMetrics
    val w = if (wm.desiredMinimumWidth > 0) wm.desiredMinimumWidth else m.widthPixels
    val h = if (wm.desiredMinimumHeight > 0) wm.desiredMinimumHeight else m.heightPixels
    return Pair(w, h)
  }

  private fun decodeSampled(uriString: String, reqW: Int, reqH: Int): Bitmap {
    val resolver = context.contentResolver
    val uri = Uri.parse(uriString)
    val bounds = BitmapFactory.Options().apply { inJustDecodeBounds = true }
    try {
      resolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, bounds) }
    } catch (e: Exception) {
      throw CodedException("ERR_IMAGE_DECODE", "Cannot open image: ${e.message}", e)
    }
    if (bounds.outWidth <= 0 || bounds.outHeight <= 0) {
      throw CodedException("ERR_IMAGE_DECODE", "Unsupported or empty image", null)
    }
    var sample = 1
    while (bounds.outWidth / (sample * 2) >= reqW && bounds.outHeight / (sample * 2) >= reqH) {
      sample *= 2
    }
    val opts = BitmapFactory.Options().apply { inSampleSize = sample }
    val bmp = try {
      resolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it, null, opts) }
    } catch (e: Exception) {
      throw CodedException("ERR_IMAGE_DECODE", "Cannot decode image: ${e.message}", e)
    }
    return bmp ?: throw CodedException("ERR_IMAGE_DECODE", "Cannot decode image", null)
  }

  private fun centerCrop(src: Bitmap, w: Int, h: Int): Bitmap {
    val scale = max(w.toFloat() / src.width, h.toFloat() / src.height)
    val sw = (w / scale).toInt().coerceIn(1, src.width)
    val sh = (h / scale).toInt().coerceIn(1, src.height)
    val x = (src.width - sw) / 2
    val y = (src.height - sh) / 2
    val cropped = Bitmap.createBitmap(src, x, y, sw, sh)
    return Bitmap.createScaledBitmap(cropped, w, h, true)
  }

  /** CSS-like angle: 0 = to top, 90 = to right, 180 = to bottom. Matches the JS preview. */
  private fun renderGradient(colors: IntArray, angle: Double, w: Int, h: Int): Bitmap {
    val rad = Math.toRadians(angle)
    var dx = sin(rad).toFloat()
    var dy = (-cos(rad)).toFloat()
    val m = max(abs(dx), abs(dy))
    dx /= m
    dy /= m
    val x0 = w * (0.5f - dx / 2f)
    val y0 = h * (0.5f - dy / 2f)
    val x1 = w * (0.5f + dx / 2f)
    val y1 = h * (0.5f + dy / 2f)
    val bitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888)
    val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
      shader = LinearGradient(x0, y0, x1, y1, colors, null, Shader.TileMode.CLAMP)
    }
    Canvas(bitmap).drawRect(0f, 0f, w.toFloat(), h.toFloat(), paint)
    return bitmap
  }

  private fun applyBitmap(bitmap: Bitmap, target: String) {
    val wm = WallpaperManager.getInstance(context)
    if (!wm.isWallpaperSupported || !wm.isSetWallpaperAllowed) {
      throw CodedException(
        "ERR_WALLPAPER_UNAVAILABLE",
        "Wallpaper changes are not allowed on this device",
        null
      )
    }
    val which = when (target) {
      "home" -> WallpaperManager.FLAG_SYSTEM
      "lock" -> WallpaperManager.FLAG_LOCK
      else -> WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
    }
    try {
      wm.setBitmap(bitmap, null, true, which)
    } catch (e: Exception) {
      throw CodedException("ERR_WALLPAPER_SET", e.message ?: "Failed to set wallpaper", e)
    }
  }
}

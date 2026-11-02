import { ToastAndroid } from 'react-native';

export const notify = (message: string) => ToastAndroid.show(message, ToastAndroid.LONG);

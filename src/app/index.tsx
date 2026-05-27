import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect root path to our Dashboard tab (/home)
  return <Redirect href="/home" />;
}

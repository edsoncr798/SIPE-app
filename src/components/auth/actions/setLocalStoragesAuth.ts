import profileStore from '@/components/auth/profile.store'

export default function (user: any) {
  localStorage.setItem("user", JSON.stringify(user));
  profileStore.setUser(user);
}
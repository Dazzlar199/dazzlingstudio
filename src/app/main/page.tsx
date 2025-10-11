'use client';

import ModeSelectorNew from '@/components/shared/ModeSelectorNew';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  const handleModeSelect = (mode: 'audio' | 'webdev') => {
    if (mode === 'audio') {
      router.push('/music');
    } else if (mode === 'webdev') {
      router.push('/dev');
    }
  };

  return <ModeSelectorNew onModeSelect={handleModeSelect} />;
}
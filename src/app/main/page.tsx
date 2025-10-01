'use client';

import ModeSelector from '@/components/shared/ModeSelector';
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

  return <ModeSelector onModeSelect={handleModeSelect} />;
}
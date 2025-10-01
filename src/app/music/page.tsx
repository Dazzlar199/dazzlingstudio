'use client';

import AudioEngineerPage from '@/components/audio/AudioEngineerPage';

export default function MusicPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <AudioEngineerPage />
    </div>
  );
}
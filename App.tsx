export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        {/* ... diğer provider'lar ve app içeriği ... */}
      </LanguageProvider>
    </AuthProvider>
  );
} 
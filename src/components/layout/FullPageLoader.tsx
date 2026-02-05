import Logo from "../Logo";

interface FullPageLoaderProps {
  /** 가운데 표시할 텍스트 (예: "쿠키를 불러오는 중...") */
  message?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  message = "Loading...",
}) => {
  return (
    <main className="w-full min-h-[calc(100vh-3.5rem)] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* 브랜드 로고 */}
        <div className="px-6 py-3 rounded-full bg-brand-primary shadow-md">
          <span className="text-xl font-extrabold text-black">Mrumbl</span>
        </div>

        {/* 로딩 스피너 + 바 */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-primary border-e-transparent" />
          <div className="w-32 h-1 bg-brand-primary/30 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-brand-primary animate-pulse" />
          </div>
        </div>

        {/* 안내 문구 */}
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </main>
  );
};

export default FullPageLoader;


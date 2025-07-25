import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, UploadCloud } from "lucide-react";
import { useKeywordStore } from "@/store/useKeywordStore";

const HeroSection = () => {
  const [keyword, setKeyword] = useState("");
  const [fileText, setFileText] = useState("");
  const [previewText, setPreviewText] = useState("");
  const { trendingKeywords } = useKeywordStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (customKeyword?: string) => {
    const base = customKeyword ?? keyword;
    const fullText = `${base} ${fileText}`.trim();
    if (!fullText) return;
    navigate(`/search?query=${encodeURIComponent(fullText)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setFileText(text);
      setPreviewText(text.slice(0, 500));
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      alert("텍스트 파일(.txt)만 업로드 가능합니다.");
    }
  };

  const handleKeywordClick = (word: string) => {
    setKeyword(word);      // input에 보여주기
    setFileText("");       // 파일 내용 초기화
    handleSearch(word);    // 즉시 검색 실행
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent">
      <div className="absolute inset-0 bg-gradient-subtle opacity-30" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl w-full px-6 py-20 text-center">
        <div className="space-y-8">
          {/* 메인 텍스트 */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              한국사도, 국어도, 수학도,{" "}
              <span className="text-white/90">해설까지 완벽하게</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              문풀과 함께 시작하세요
            </p>
            <p className="text-lg text-white/70">
              모든 분야의 전문가와 만나보세요
            </p>
          </div>

          {/* 검색창 */}
          <div className="max-w-2xl mx-auto pt-8">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="배우고 싶은 분야를 검색하세요..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-6 py-4 text-lg rounded-full border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20 bg-white/95 backdrop-blur-sm"
              />
              <Button
                size="icon"
                onClick={() => handleSearch()}
                className="rounded-full w-12 h-12 bg-gradient-primary hover:scale-105"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                onClick={handleFileButtonClick}
                className="rounded-full w-12 h-12 bg-gradient-primary hover:scale-105"
              >
                <UploadCloud className="h-5 w-5" />
              </Button>
              <input
                type="file"
                accept=".txt"
                ref={fileInputRef}
                onChange={handleFileUpload}
                hidden
              />
            </div>

            {/* 파일 미리보기 */}
            {previewText && (
              <div className="mt-4 bg-white/90 rounded-xl p-4 text-sm text-left shadow-md max-h-60 overflow-y-auto">
                <p className="font-bold mb-2 text-gray-800">파일 미리보기</p>
                <pre className="whitespace-pre-wrap text-gray-600">
                  {previewText}
                </pre>
              </div>
            )}
          </div>

          {/* 실시간 인기 검색어 */}
          {trendingKeywords.length > 0 && (
            <div className="pt-4">
              <p className="text-white text-sm mb-2">실시간 인기 검색어</p>
              <div className="flex flex-wrap justify-center gap-2">
                {trendingKeywords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordClick(word)}
                    className="px-3 py-1 rounded-full bg-white/80 hover:bg-white text-sm text-gray-800 font-medium shadow-sm transition-all"
                  >
                    #{word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 대표 카테고리 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto">
            <CategoryCard icon="📚" title="한국사" description="조선시대부터 현대사까지 체계적인 한국사 학습을 도와드립니다" />
            <CategoryCard icon="✏️" title="국어" description="문법, 독해, 작문까지 국어 실력 향상을 위한 맞춤 지도" />
            <CategoryCard icon="🔢" title="수학" description="기초부터 심화까지 단계별 수학 학습 코칭" />
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-3xl">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default HeroSection;

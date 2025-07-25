import { useLocation } from "react-router-dom";

const dummySubjects = [
  { title: "한국사", description: "조선시대부터 현대사까지 체계적인 한국사 학습" },
  { title: "국어", description: "문법, 독해, 작문까지 국어 실력 향상" },
  { title: "수학", description: "기초부터 심화까지 단계별 수학 학습 코칭" },
  { title: "영어", description: "회화, 문법, 독해 등 영어 실력 완성" },
  { title: "코딩", description: "프론트엔드부터 백엔드까지 실무형 코딩 학습" },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultPage = () => {
  const query = useQuery().get("query") || "";

  const result = dummySubjects.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 검색 결과: “{query}”</h1>
      {result.length > 0 ? (
        <ul className="space-y-6">
          {result.map((item, idx) => (
            <li key={idx} className="border p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResultPage;

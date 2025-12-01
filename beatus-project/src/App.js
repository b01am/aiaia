import React, { useState } from 'react';
import './App.css';

function App() {
// 상태 관리
const [selectedImage, setSelectedImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const [mood, setMood] = useState([]);
const [diary, setDiary] = useState('');
const [loading, setLoading] = useState(false);

// 명언 리스트
const quotes = [
"행복은 습관이다. 그것을 몸에 지녀라. - 허버드",
"오늘 하루도 수고했어요. 내일은 더 좋은 날이 될 거예요.",
"작은 것에 감사하면, 큰 행복이 찾아옵니다.",
"당신은 충분히 잘하고 있습니다.",
"매일매일이 새로운 시작입니다.",
"힘든 날도 있어야 좋은 날이 빛나는 법이에요.",
"지금 이 순간도 당신의 소중한 이야기입니다.",
];

// 기분 옵션
const moodOptions = [
{ value: '행복해요', emoji: '😊', color: '#FFD93D' },
{ value: '기분좋아요', emoji: '😄', color: '#6BCB77' },
{ value: '평온해요', emoji: '😌', color: '#4D96FF' },
{ value: '슬퍼요', emoji: '😢', color: '#95E1D3' },
{ value: '우울해요', emoji: '😞', color: '#A8DADC' },
{ value: '화나요', emoji: '😠', color: '#FF6B6B' },
{ value: '피곤해요', emoji: '😴', color: '#C3B1E1' },
{ value: '설레요', emoji: '🥰', color: '#FFB4B4' },
];

// 이미지 선택 처리
const handleImageChange = (e) => {
const file = e.target.files[0];
if (file) {
setSelectedImage(file);
setImagePreview(URL.createObjectURL(file));
}
};

// 기분 선택 처리
const handleMoodChange = (value) => {
if (mood.includes(value)) {
setMood(mood.filter(m => m !== value));
} else {
setMood([...mood, value]);
}
};

// 랜덤 명언 선택
const getRandomQuote = () => {
return quotes[Math.floor(Math.random() * quotes.length)];
};

// 일기 생성
const generateDiary = async () => {
// 유효성 검사
if (!selectedImage) {
alert('사진을 먼저 선택하세요!');
return;
}


if (mood.length === 0) {
  alert('기분을 하나 이상 선택하세요!');
  return;
}

setLoading(true);
setDiary('AI가 사진을 분석하고 일기를 작성하고 있습니다...');

// 이미지를 Base64로 변환
const reader = new FileReader();
reader.onload = async function(e) {
  const base64Image = e.target.result.split(',')[1];

  try {
    // Claude API 호출
    const response = await fetch('<https://api.anthropic.com/v1/messages>', {
      method: 'POST',
      headers: {
        'x-api-key': 'API_KEY_HERE', // ← 여기에 실제 API 키 넣기!
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Image
              }
            },
            {
              type: 'text',
              text: `이 사진을 보고 감성적인 일기를 작성해줘.



오늘의 기분: ${mood.join(', ')}

위 기분을 반영해서 200자 정도로 따뜻하고 감성적인 일기를 작성해줘.
기분에 공감하면서 위로하거나 함께 기뻐하는 느낌으로 써줘.`
}
]
}]
})
});


    const data = await response.json();
    const diaryText = data.content[0].text;
    const randomQuote = getRandomQuote();

    // 일기 + 명언 표시
    setDiary(diaryText + '\\n\\n✨ ' + randomQuote);
  } catch (error) {
    setDiary('오류가 발생했습니다: ' + error.message);
  } finally {
    setLoading(false);
  }
};
reader.readAsDataURL(selectedImage);



};

return (
<div className="App">
<h1>📸 AI 일기장</h1>
<p className="subtitle">오늘의 순간을 기록하세요</p>

```
  {/* 사진 업로드 */}
  <div className="upload-section">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      id="image-upload"
      style={{display: 'none'}}
    />
    <label htmlFor="image-upload" className="upload-button">
      📁 사진 선택하기
    </label>
  </div>

  {/* 사진 미리보기 */}
  {imagePreview && (
    <div className="preview-section">
      <img src={imagePreview} alt="preview" className="preview-image" />
    </div>
  )}

  {/* 기분 선택 */}
  <div className="mood-section">
    <h2>🌈 오늘의 기분을 선택하세요 (여러 개 가능)</h2>
    <div className="mood-grid">
      {moodOptions.map((option) => (
        <div
          key={option.value}
          className={`mood-item ${mood.includes(option.value) ? 'selected' : ''}`}
          onClick={() => handleMoodChange(option.value)}
          style={{
            borderColor: mood.includes(option.value) ? option.color : '#ddd',
            background: mood.includes(option.value) ? option.color + '30' : 'white'
          }}
        >
          <span className="mood-emoji">{option.emoji}</span>
          <span className="mood-text">{option.value}</span>
        </div>
      ))}
    </div>
  </div>

  {/* 일기 생성 버튼 */}
  <button
    onClick={generateDiary}
    className="generate-button"
    disabled={loading || !selectedImage || mood.length === 0}
  >
    {loading ? '✨ 일기 작성 중...' : '📝 일기 생성하기'}
  </button>

  {/* 일기 결과 */}
  <div className="diary-section">
    <h2>📖 오늘의 일기</h2>
    <div className="diary-content">
      {diary || '사진과 기분을 선택한 후 일기 생성 버튼을 눌러주세요 💫'}
    </div>
  </div>
</div>



);
}

export default App;
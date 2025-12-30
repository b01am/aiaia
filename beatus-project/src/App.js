import React, { useState } from 'react';
import './App.css';

const API_KEY = "AIzaSyBO-Pl-JLA3wHaAOTG93HGSa9UJJ_gAMuY";

function App() {
  // 상태 관리
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mood, setMood] = useState('');
  const [selectedFont, setSelectedFont] = useState('Gaegu');
  const [diary, setDiary] = useState('');
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  // 감정 옵션 (label로 명언 분류)
  const moodOptions = [
    { value: '행복해요', emoji: '😊', color: '#FFD93D', label: '행복' },
    { value: '기분좋아요', emoji: '😄', color: '#6BCB77', label: '행복' },
    { value: '설레요', emoji: '🥰', color: '#FFB4B4', label: '행복' },
    { value: '평온해요', emoji: '😌', color: '#4D96FF', label: '일반' },
    { value: '슬퍼요', emoji: '😢', color: '#95E1D3', label: '슬픔' },
    { value: '우울해요', emoji: '😞', color: '#A8DADC', label: '슬픔' },
    { value: '화나요', emoji: '😠', color: '#FF6B6B', label: '힘듦' },
    { value: '피곤해요', emoji: '😴', color: '#C3B1E1', label: '힘듦' }
  ];

  // 필기체 옵션 (5개)
  const fontOptions = [
    { name: '개구쟁이', value: 'Gaegu' },
    { name: '하믈렛', value: 'Hahmlet' },
    { name: '연성', value: 'Yeon Sung' },
    { name: '싱글데이', value: 'Single Day' },
    { name: '흑백사진', value: 'Black And White Picture' }
  ];

  // 감정별 명언
  const quotesByLabel = {
    '행복': [
      "이 세상에서 가장 행복한 사람은 일하는 사람, 사랑하는 사람, 희망이 있는 사람이다. -조셉 에디슨",
      "좋아하는 일을 하는 것은 자유요, 하는 일을 좋아하는 것은 행복이다. - 프랭크 타이거",
      "내 기분은 내가 정해. 오늘 나는 '행복'으로 할래. - 이상한 나라의 앨리스",
      "꿈꾸는 일들아 이루어져라 화이팅!",
      "오늘도 당신은 행복이 어울려요",
      "행복은 네가 경험하는 것이 아니라 네가 기억하는 것이다. -오스카 레반트",
      "모든 것들이 숨을 죽이지만 봄만은 예외다. 봄은 그 어느때보다 더 힘차게 치솟아 오른다.",
      "삶이 있는 한 희망은 있다. -키케로",
      "피할수 없으면 즐겨라. - 로버트 엘리엇",
      "1퍼센트의 가능성, 그것이 나의 길이다. -나폴레옹",
      "꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다. -괴테"
    ],
    '힘듦': [
      "이 또한 지나가리라",
      "희망은 날개 달린 것",
      "시간은 모든 것을 치유한다.",
      "삶이 있는 한 희망은 있다.",
      "언제나 현재에 집중할 수 있다면 행복할 것이다.",
      "신은 용기있는 자를 결코 버리지 않는다.",
      "피할 수 없다면 즐겨라",
      "행복한 삶을 살기 위해 필요한 것은 거의 없다.",
      "내일은 내일의 태양이 뜬다.",
      "어리석은 자는 멀리서 행복을 찾고, 현명한 자는 자신의 발치에서 행복을 키워간다."
    ],
    '일반': [
      "가장 어려운 일은 스스로를 깨끗이 닦는 일이다.",
      "네 자신을 믿어라. 너 자신이 가장 큰 기적이다.",
      "성공은 준비된 사람을 만나게 된다.",
      "성공의 비결은 실패를 견뎌내는 데 있다.",
      "행동은 모든 성공의 기초다.",
      "당신의 미래는 당신이 만든다.",
      "포기하지 않으면 언젠가는 성공한다.",
      "눈 앞의 어려움에 의해 당황하지 말고, 큰 그림을 보라.",
      "최고의 복수는 무시하고 성공하는 것이다.",
      "승리는 불가능할 때 더 가까워진다."
    ],
    '슬픔': [
      "누구를 사랑하고자 한다면, 너 자신을 먼저 사랑해. -미녀와 야수-",
      "매일이 행복하진 않지만 행복한 일은 매일 있어. -곰돌이 푸-",
      "겨울이 오면 봄이 멀지 않으리 -셸리",
      "삶이 그대를 속일지라도 슬퍼하거나 노하지 말아라 슬픈 날에 참고 견디라. 즐거운 날은 오고야 말리니 - 푸쉬킨",
      "도중에 포기하지 말라. 망설이지 말라. 최후의 성공을 거둘 때까지 밀고 나가자. - 헨리포드",
      "삶을 사는 데는 단 두가지 방법이 있다. 하나는 기적이 전혀 없다고 여기는 것이고 또 다른 하나는 모든 것이 기적이라고 여기는 방식이다. - 알베르트 아인슈타인",
      "성공의 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.- 톰 모나건",
      "절대 어제를 후회하지 마라. 인생은 오늘의 내 안에 있고 내일은 스스로 만드는것이다. -L론허바드",
      "고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다. -괴테",
      "고난의 시기에 동요하지 않는 것, 이것은 진정 칭찬받을 만한 뛰어난 인물의 증거다. -베토벤"
    ]
  };

  // 사진 선택 (3장 이상)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length < 3) {
      alert('최소 3장 이상의 사진을 선택해주세요!');
      return;
    }
    
    setSelectedImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // 명언 선택 (label 기반)
  const getRandomQuote = () => {
    const selectedMood = moodOptions.find(option => option.value === mood);
    if (!selectedMood) return "오늘도 좋은 하루 되세요.";
    
    const quotes = quotesByLabel[selectedMood.label];
    if (!quotes || quotes.length === 0) return "오늘도 좋은 하루 되세요.";
    
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  // 일기 생성 (Gemini API v1beta)
  const generateDiary = async () => {
    if (selectedImages.length < 3) {
      alert('사진을 최소 3장 이상 선택하세요!');
      return;
    }
    if (!mood) {
      alert('기분을 선택하세요!');
      return;
    }

    setLoading(true);
    setDiary('AI가 사진들을 분석하고 일기를 작성하고 있습니다...');
    setQuote('');

    try {
      // Base64 변환
      const imageParts = await Promise.all(
        selectedImages.map(file =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = e => {
              const base64 = e.target.result.split(',')[1];
              resolve({
                inlineData: {
                  mimeType: file.type || "image/jpeg",
                  data: base64
                }
              });
            };
            reader.readAsDataURL(file);
          })
        )
      );

      // Gemini API 호출
      console.log('🔄 API 호출 시작...');
      console.log('📸 이미지 수:', selectedImages.length);
      console.log('😊 기분:', mood);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [
                ...imageParts,
                {
                  text: `이 ${selectedImages.length}장의 사진들을 보고 사용자의 기분은 "${mood}" 입니다. 
위 기분을 반영해서 200-300자로 오늘 한 일을 전체적인 기분에 맞춰서 따뜻하고 너무 짧지 않은 문장으로 써줘. 감동적으로 작성해줘. 기분이 부정적이라면 위로의 문구를 일기에 포함해줘. 기분이 부정적일때는 오늘 하루를 성찰하는 톤으로 작성해주고, 기분이 긍정적이라면, 희망과 기쁨이 묻어나는 톤으로 작성해줘. 문학적인 표현은 줄이고 이모티콘사용도 자제해줘. -습니다 체말고 -다 체로 써줘. 학술적인 용어나 전문적인 용어말고 일상적인 단어로 구성해줘. 괄호친 부분, 사진분석한 내용은 일기에서 빼줘.`
                }
              ]
            }]
          })
        }
      );

      console.log('📡 응답 상태:', response.status);
      
      const data = await response.json();
      console.log('📦 응답 데이터:', data);

      if (!response.ok) {
        console.error('❌ API 오류:', data);
        throw new Error(data.error?.message || 'API 호출 실패');
      }

      // 응답 파싱
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      console.log('📝 생성된 일기:', generatedText);
      
      if (generatedText) {
        setDiary(generatedText);
        const selectedQuote = getRandomQuote();
        setQuote(selectedQuote);
        console.log('✅ 일기 생성 완료!');
        console.log('💭 명언:', selectedQuote);
      } else {
        console.error('❌ 응답에서 텍스트를 찾을 수 없음:', data);
        setDiary(data.error?.message || "일기를 생성할 수 없습니다. 다시 시도해주세요.");
        setQuote('');
      }
    } catch (err) {
      console.error('❌ 오류:', err);
      setDiary(`오류 발생: ${err.message}\n\nAPI 키를 확인하세요!`);
      setQuote('');
    } finally {
      setLoading(false);
    }
  };

  // 이미지 저장
  const saveAsImage = () => {
    if (!diary || loading) {
      alert('먼저 일기를 생성해주세요!');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = quote ? 1400 : 1200;
    
    // 배경
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#FFF9E6');
    gradient.addColorStop(1, '#FFE8CC');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 테두리
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    ctx.strokeStyle = '#E8D4B8';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // 제목 배경
    ctx.fillStyle = 'rgba(212, 165, 116, 0.1)';
    ctx.fillRect(40, 40, canvas.width - 80, 140);
    
    // 제목
    ctx.fillStyle = '#5D4E37';
    ctx.font = `bold 48px "${selectedFont}"`;
    ctx.textAlign = 'center';
    ctx.fillText('📸 오늘의 일기', canvas.width / 2, 100);
    
    // 날짜
    const today = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    ctx.font = `26px "${selectedFont}"`;
    ctx.fillStyle = '#8B7355';
    ctx.fillText(today, canvas.width / 2, 145);
    
    // 기분
    if (mood) {
      const selectedMoodOption = moodOptions.find(opt => opt.value === mood);
      ctx.font = `28px "${selectedFont}"`;
      ctx.fillStyle = '#5D4E37';
      ctx.fillText(`오늘의 기분: ${selectedMoodOption?.emoji || ''} ${mood}`, canvas.width / 2, 210);
    }
    
    // 구분선
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 240);
    ctx.lineTo(canvas.width - 80, 240);
    ctx.stroke();
    
    // 일기
    ctx.font = `32px "${selectedFont}"`;
    ctx.fillStyle = '#2C2416';
    ctx.textAlign = 'left';
    
    const lines = diary.split('\n');
    const lineHeight = 50;
    const maxWidth = canvas.width - 140;
    let y = 300;
    
    lines.forEach(line => {
      if (!line.trim()) {
        y += lineHeight * 0.5;
        return;
      }
      
      const chars = line.split('');
      let currentLine = '';
      
      chars.forEach(char => {
        const testLine = currentLine + char;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine !== '') {
          ctx.fillText(currentLine, 70, y);
          currentLine = char;
          y += lineHeight;
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine) {
        ctx.fillText(currentLine, 70, y);
        y += lineHeight;
      }
    });
    
    // 명언
    if (quote) {
      y += 40;
      
      ctx.fillStyle = 'rgba(212, 165, 116, 0.15)';
      ctx.fillRect(50, y - 30, canvas.width - 100, 180);
      
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('💭', canvas.width / 2, y + 10);
      
      ctx.font = `24px "${selectedFont}"`;
      ctx.fillStyle = '#5D4E37';
      
      const quoteMaxWidth = canvas.width - 140;
      let quoteY = y + 60;
      const quoteChars = quote.split('');
      let quoteLine = '';
      
      quoteChars.forEach((char) => {
        const testLine = quoteLine + char;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > quoteMaxWidth && quoteLine !== '') {
          ctx.fillText(quoteLine.trim(), canvas.width / 2, quoteY);
          quoteLine = char;
          quoteY += 35;
        } else {
          quoteLine = testLine;
        }
      });
      
      if (quoteLine.trim()) {
        ctx.fillText(quoteLine.trim(), canvas.width / 2, quoteY);
      }
    }
    
    // 다운로드
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '');
      link.download = `AI일기_${dateStr}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="App">
      <h1>📸 AI 일기장</h1>
      <p className="subtitle">오늘의 순간을 기록하세요</p>
      
      {/* 사진 업로드 */}
      <div className="upload-section">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          id="image-upload"
          multiple
          style={{display: 'none'}}
        />
        <label htmlFor="image-upload" className="upload-button">
          📁 사진 선택하기 (3장 이상)
        </label>
        {selectedImages.length > 0 && (
          <p className="image-count">{selectedImages.length}장 선택됨 ✅</p>
        )}
      </div>

      {/* 사진 미리보기 */}
      {imagePreviews.length > 0 && (
        <div className="preview-section">
          <div className="preview-grid">
            {imagePreviews.map((preview, index) => (
              <img 
                key={index} 
                src={preview} 
                alt={`preview ${index + 1}`} 
                className="preview-image" 
              />
            ))}
          </div>
        </div>
      )}

      {/* 기분 선택 */}
      <div className="mood-section">
        <h2>🌈 오늘의 기분을 선택하세요</h2>
        <div className="mood-grid">
          {moodOptions.map((option) => (
            <div
              key={option.value}
              className={`mood-item ${mood === option.value ? 'selected' : ''}`}
              onClick={() => setMood(option.value)}
              style={{
                borderColor: mood === option.value ? option.color : '#ddd',
                background: mood === option.value ? option.color + '30' : 'white'
              }}
            >
              <span className="mood-emoji">{option.emoji}</span>
              <span className="mood-text">{option.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 필기체 선택 */}
      <div className="font-section">
        <h3>✍️ 필기체 선택</h3>
        <div className="font-grid">
          {fontOptions.map((font) => (
            <button
              key={font.value}
              className={`font-button ${selectedFont === font.value ? 'selected' : ''}`}
              onClick={() => setSelectedFont(font.value)}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      {/* 일기 생성 버튼 */}
      <button 
        onClick={generateDiary} 
        className="generate-button"
        disabled={loading || selectedImages.length < 3 || !mood}
      >
        {loading ? '✨ 일기 작성 중...' : '📝 일기 생성하기'}
      </button>

      {/* 일기 결과 */}
      <div className="diary-section">
        <h2>📖 오늘의 일기</h2>
        <div 
          className="diary-content" 
          style={{ fontFamily: selectedFont }}
        >
          {diary || '사진과 기분을 선택한 후 일기 생성 버튼을 눌러주세요 💫'}
        </div>
        
        {/* 명언 */}
        {quote && !loading && (
          <div className="quote-section">
            <div className="quote-icon">💭</div>
            <p className="quote-text">{quote}</p>
          </div>
        )}
      </div>

      {/* 저장 버튼 */}
      {diary && !loading && diary !== '사진과 기분을 선택한 후 일기 생성 버튼을 눌러주세요 💫' && (
        <button onClick={saveAsImage} className="save-button">
          💾 이미지로 저장하기
        </button>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mood, setMood] = useState('');
  const [diary, setDiary] = useState('');
  const [loading, setLoading] = useState(false);

  const MIN_IMAGES = 3;
  const MAX_IMAGES = 10;

  const quotesByMood = {
    '행복': ["이 세상에서 가장 행복한 사람은 일하는 사람" ,  
      "사랑하는 사람, 희망이 있는 사람이다. -조셉 에디슨" , 
      "좋아하는 일을 하는 것은 자유요, 하는 일을 좋아하는 것은 행복이다. - 프랭크 타이거",
      "내 기분은 내가 정해. 오늘 나는 ‘행복’으로 할래. - 이상한 나라의 앨리스 ",
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
    '슬픔': [
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
    '일반': ["누구를 사랑하고자 한다면, 너 자신을 먼저 사랑해. -미녀와 야수-",
      "매일이 행복하진 않지만 행복한 일은 매일 있어. -곰돌이 푸-",
      "겨울이 오면 봄이 멀지 않으리 -셸리",
      "삶이 그대를 속일지라도 슬퍼하거나 노하지 말아라 슬픈 날에 참고 견디라. 즐거운 날은 오고야 말리니 마음은 미래를 바라느니 현재는 한없이 우울한것 모든건 하염없이 사라지나가 버리고 그리움이 되리니 - 푸쉬킨",
      "도중에 포기하지 말라. 망설이지 말라. 최후의 성공을 거둘 때까지 밀고 나가자. - 헨리포드",
      "삶을 사는 데는 단 두가지 방법이 있다. 하나는 기적이 전혀 없다고 여기는 것이고 또 다른 하나는 모든 것이 기적이라고 여기는 방식이다. - 알베르트 아인슈타인",
      "성공의 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.- 톰 모나건",
      "절대 어제를 후회하지 마라. 인생은 오늘의 내 안에 있고 내일은 스스로 만드는것이다. -L론허바드", 
      "고통이 남기고 간 뒤를 보라! 고난이 지나면 반드시 기쁨이 스며든다. -괴테",
      "고난의 시기에 동요하지 않는 것, 이것은 진정 칭찬받을 만한 뛰어난 인물의 증거다. -베토벤"
    ]
  };

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < MIN_IMAGES) {
      alert(`최소 ${MIN_IMAGES}장의 사진을 선택해주세요!`);
      return;
    }

    if (files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장까지만 선택 가능합니다!`);
      return;
    }

    setSelectedImages(files);

    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(previews => {
      setImagePreviews(previews);
    });
  };

  const handleMoodChange = (value) => {
    setMood(value);
  };

  const getMoodLabel = () => {
    const selectedMood = moodOptions.find(option => option.value === mood);
    return selectedMood ? selectedMood.label : '일반';
  };

  const getRandomQuote = () => {
    const label = getMoodLabel();
    const quotesForMood = quotesByMood[label] || quotesByMood['일반'];
    return quotesForMood[Math.floor(Math.random() * quotesForMood.length)];
  };

  const generateDiary = async () => {
    if (selectedImages.length < MIN_IMAGES) {
      alert(`최소 ${MIN_IMAGES}장의 사진을 선택하세요!`);
      return;
    }

    if (!mood) {
      alert('기분을 하나 선택하세요!');
      return;
    }

    setLoading(true);
    setDiary('AI가 사진들을 분석하고 일기를 작성하고 있습니다...');

    try {
      const base64Images = await Promise.all(
        Array.from(selectedImages).map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result.split(',')[1]);
            reader.readAsDataURL(file);
          });
        })
      );

      const contentArray = [];

      base64Images.forEach((base64Image) => {
        contentArray.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: base64Image
          }
        });
      });

      contentArray.push({
        type: 'text',
        text: `이 ${selectedImages.length}장의 사진들을 보고 하루 일기를 작성해줘.

오늘의 기분: ${mood}

사진들을 시간 순서대로 이어서 하루의 이야기를 만들어줘.
각 사진에서 무엇을 했는지 분석하고, "${mood}" 감정을 반영해서
300-400자 정도로 따뜻하고 감성적인 일기를 작성해줘.`
      });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': 'API_KEY_HERE',
          'content-type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          messages: [{ role: 'user', content: contentArray }]
        })
      });

      const data = await response.json();
      const diaryText = data.content[0].text;
      const randomQuote = getRandomQuote();

      setDiary(diaryText + '\n\n✨ ' + randomQuote);
    } catch (error) {
      setDiary('오류가 발생했습니다: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>📸 AI 일기장</h1>
      <p className="subtitle">오늘의 순간을 기록하세요</p>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          id="image-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="image-upload" className="upload-button">
          📁 사진 선택하기 (최소 {MIN_IMAGES}장)
        </label>
        <p className="info-text">
          {MIN_IMAGES}장 ~ {MAX_IMAGES}장까지 선택 가능
        </p>
      </div>

      {imagePreviews.length > 0 && (
        <div className="preview-section">
          <h3>선택한 사진 ({imagePreviews.length}장)</h3>
          <div className="image-grid">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img src={preview} alt={`preview ${index + 1}`} className="preview-image" />
                <span className="image-number">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mood-section">
        <h2>🌈 오늘의 기분을 선택하세요 (하나만)</h2>
        <div className="mood-grid">
          {moodOptions.map((option) => (
            <div
              key={option.value}
              className={`mood-item ${mood === option.value ? 'selected' : ''}`}
              onClick={() => handleMoodChange(option.value)}
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
        {mood && (
          <p className="selected-mood">
            선택된 기분: {mood} ({getMoodLabel()} 카테고리)
          </p>
        )}
      </div>

      <button
        onClick={generateDiary}
        className="generate-button"
        disabled={loading || selectedImages.length < MIN_IMAGES || !mood}
      >
        {loading ? '✨ 일기 작성 중...' : '📝 일기 생성하기'}
      </button>

      <div className="diary-section">
        <h2>📖 오늘의 일기</h2>
        <div className="diary-content">
          {diary || '사진 3장 이상과 기분을 선택한 후 일기 생성 버튼을 눌러주세요 💫'}
        </div>
      </div>
    </div>
  );
}

export default App;

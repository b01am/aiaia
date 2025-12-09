import React, { useState } from 'react';
import axios from 'axios'; // 1단계에서 설치한 axios를 불러옵니다.

const ImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);

    if (filesArray.length === 0) return;

    // 최대 4장 제한 로직
    if (filesArray.length > 4) {
      alert("사진은 최대 4장까지만 선택할 수 있습니다.");
      event.target.value = null; 
      setSelectedFiles([]);
      setImagePreviews([]);
      return;
    }

    setSelectedFiles(filesArray);
    event.target.value = null;
    // 미리보기 URL 생성 및 상태 업데이트
    const previews = filesArray.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("업로드할 사진을 선택해 주세요.");
      return;
    }

    const formData = new FormData();
    
    selectedFiles.forEach((file) => {
      // 서버에서 'images'라는 키로 파일들을 받게 됩니다.
      formData.append('images', file); 
    });

    try {
      // TODO: ⚠️ 이 부분을 **실제 백엔드 업로드 URL**로 변경해야 합니다.
      const uploadUrl = 'YOUR_BACKEND_UPLOAD_URL'; 

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log('업로드 성공:', response.data);
      alert('사진이 성공적으로 업로드되었습니다!');

      // 성공 후 상태 초기화
      setSelectedFiles([]);
      setImagePreviews([]);
      // 파일 input도 초기화 (다시 같은 파일을 선택할 수 있도록)
      document.getElementById('file-input').value = null;
      
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('사진 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #eee', maxWidth: '600px', margin: '30px auto', textAlign: 'center' }}>
      <h2>사진 4장 업로더 (React)</h2>
      <input 
        id="file-input" // input 초기화를 위해 id 추가
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      <p style={{ fontWeight: 'bold' }}>
        현재 {selectedFiles.length}장 선택됨 (최대 4장)
      </p>

      {/* 미리보기 영역 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {imagePreviews.map((url, index) => (
          <div key={index}>
            <img 
              src={url} 
              alt={`Preview ${index + 1}`} 
              style={{ width: '100px', height: '100px', objectFit: 'cover', border: '2px solid #5cb85c' }}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={handleUpload} 
        disabled={selectedFiles.length === 0}
        style={{ marginTop: '30px', padding: '10px 20px', cursor: selectedFiles.length === 0 ? 'not-allowed' : 'pointer' }}
      >
        📸 서버에 사진 저장하기
      </button>
    </div>
  );
};

export default ImageUploader;
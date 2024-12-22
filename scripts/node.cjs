const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

async function processFiles() {
  try {
    // JSON 파일을 읽어오고 파싱
    const dataPath = path.join(__dirname, '../public/assets/data/data.json');
    const newDataPath = path.join(__dirname, '../public/assets/data/new-data.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newData = [];

    for (let item of data) {
      // UUID 생성
      const newId = uuid();

      const newItem = {
        id: newId,
        title: item.title,
        location: item.location,
        area: item.area,
        address: item.address,
        description: item.description,
        playtime: item.playtime,
        isHorror: item.special_tags.filter((i) => i === '공포').length > 0,
        page: item.store_homepage,
        price: item.price || 0,
        reservePageUrl: item.reserve_url,
        branchName: item.store_name,
        branchTel: item.store_tel,
      };

      newData.push(newItem);

      // thumb_loc으로부터 파일 위치 구성
      const thumbLocPath = path.join(__dirname, '../public/assets/theme-img', item.thumb_loc.split('/')[1] + '.jpg');

      // 파일 존재 여부 확인 후 이름 변경
      try {
        console.log(thumbLocPath);
        await fs.access(thumbLocPath); // 파일이 존재하는지 확인
        const newThumbName = `thumb_${newId}${path.extname(item.thumb_loc)}`; // 확장자는 기존 그대로
        const newThumbPath = path.join(__dirname, '../public/assets/theme-img', newThumbName + '.jpg');

        // 파일명 변경
        await fs.rename(thumbLocPath, newThumbPath);
      } catch (err) {
        console.log(`File not found for thumb_loc: ${item.thumb_loc}, skipping rename.`);
      }
    }

    // 업데이트된 내용을 다시 JSON 파일로 작성
    await fs.writeFile(newDataPath, JSON.stringify(newData), 'utf8');
    console.log('Processing completed successfully.');
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

processFiles();

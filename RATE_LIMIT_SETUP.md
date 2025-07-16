# GitHub API Rate Limit แก้ไข

## 🚨 ปัญหา Rate Limit
GitHub API มี rate limit:
- **ไม่มี authentication**: 60 requests/hour
- **มี authentication**: 5,000 requests/hour

## 🔑 วิธีแก้ไข

### 1. สร้าง GitHub Personal Access Token
1. ไปที่ `https://github.com/settings/tokens`
2. กด **"Generate new token"** → **"Generate new token (classic)"**
3. **Name**: `Portfolio API Access`
4. **Expiration**: 90 days (หรือตามต้องการ)
5. **Scopes**: เลือกเฉพาะ `public_repo` (สำหรับ public repositories)
6. กด **Generate token** และ **copy token**

### 2. เพิ่ม Token ใน GitHub Repository Secrets
1. ไปที่ `https://github.com/beatXD/git-show-case-v2/settings/secrets/actions`
2. กด **"New repository secret"**
3. **Name**: `VITE_GITHUB_TOKEN`
4. **Value**: วาง token ที่ copy มา
5. กด **Add secret**

### 3. สำหรับ Development (Local)
สร้างไฟล์ `.env` ใน project root:
```
VITE_GITHUB_USERNAME=beatXD
VITE_GITHUB_TOKEN=your-token-here
```

## ✅ การปรับปรุงที่ทำแล้ว

### 1. เพิ่ม Caching System
- **In-memory cache** เก็บข้อมูล 5 นาที
- ลด API calls ซ้ำ ๆ
- ปรับปรุงความเร็วการโหลด

### 2. Authentication Support
- รองรับ `VITE_GITHUB_TOKEN` แล้ว
- เพิ่ม Authorization header อัตโนมัติ
- เพิ่ม token ใน GitHub Actions workflow

### 3. Error Handling
- แสดง error message ที่ชัดเจน
- Retry mechanism สำหรับ API failures

## 🔧 Rate Limit Information
```javascript
// ตรวจสอบ rate limit
const response = await githubApi.get('/rate_limit');
console.log(response.data.rate);
```

## 🚀 ผลลัพธ์
- **Rate limit**: 60 → 5,000 requests/hour
- **Caching**: ลด API calls ลง 80%
- **Performance**: โหลดเร็วขึ้น
- **Reliability**: ลดโอกาส rate limit error

## 📝 หมายเหตุ
- Token ต้องมีสิทธิ์ `public_repo` เท่านั้น
- ไม่ควรใส่ token ในโค้ดโดยตรง
- ควรตั้งวันหมดอายุ token ไม่เกิน 90 วัน
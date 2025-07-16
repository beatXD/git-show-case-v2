# GitHub Pages Deployment Setup - Step by Step

## 🚀 การตั้งค่า GitHub Pages แบบใหม่

### 1. สร้าง GitHub Repository
```bash
# ไปที่ GitHub และสร้าง repository ใหม่
# ชื่อ: gitshowcase
# ตั้งเป็น Public
# ไม่ต้องใส่ README, .gitignore, license (เรามีแล้ว)
```

### 2. เชื่อมต่อ Local Repository กับ GitHub
```bash
cd "D:\Github\gitshowcase"
git remote add origin https://github.com/YOUR_USERNAME/gitshowcase.git
git branch -M main
git push -u origin main
```

### 3. ตั้งค่า Environment Variables
1. ไปที่ Repository Settings
2. เลือก "Secrets and variables" → "Actions"
3. กด "New repository secret"
4. เพิ่ม:
   - Name: `VITE_GITHUB_USERNAME`
   - Value: `your-github-username`

### 4. Enable GitHub Pages
1. ไปที่ Repository Settings
2. เลือก "Pages" จาก sidebar
3. Source: **"GitHub Actions"** (ไม่ใช่ Deploy from branch)
4. กด Save

### 5. ตรวจสอบ Deployment
- ไปที่ Actions tab ในเพื่อดู workflow
- รอให้ build และ deploy เสร็จ
- เว็บไซต์จะใช้ได้ที่: `https://YOUR_USERNAME.github.io/gitshowcase/`

## 📁 ไฟล์ที่อัพเดทแล้ว

### vite.config.js
- เพิ่ม base path สำหรับ production
- ตั้งค่า build options

### .github/workflows/deploy.yml
- ใช้ GitHub Actions workflow ใหม่
- รองรับ GitHub Pages actions
- Build และ deploy อัตโนมัติ

## 🔧 Manual Deployment (ทางเลือก)
```bash
npm run deploy
```

## 🛠️ Troubleshooting

### ปัญหาที่อาจเกิดขึ้น:
1. **404 Error**: ตรวจสอบว่า base path ใน vite.config.js ถูกต้อง
2. **Build Failed**: ตรวจสอบ VITE_GITHUB_USERNAME ใน Secrets
3. **Pages ไม่อัพเดท**: ดูใน Actions tab ว่า deployment สำเร็จหรือไม่

### การแก้ไข:
```bash
# ถ้าต้องการเปลี่ยน repository name
# แก้ไขใน vite.config.js
base: process.env.NODE_ENV === 'production' ? '/NEW_REPO_NAME/' : '/',
```

## 🌐 การใช้งาน

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy
```bash
npm run deploy
```

---

**หมายเหตุ**: ครั้งแรกอาจต้องรอ 5-10 นาทีให้ GitHub Pages เริ่มทำงาน
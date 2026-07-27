import { mockUniversities } from './mockUniversities';

export interface Reply {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Thread {
  id: string;
  title: string;
  content?: string;
  author: string;
  avatar: string;
  tag?: string;
  repliesCount: number;
  viewsCount: string;
  createdAt: string;
  isSticky?: boolean;
  replies?: Reply[];
}

export interface ForumArea {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  threadsCount: string;
  messagesCount: string;
  latestThread: Thread;
  threads?: Thread[];
}

export interface Category {
  id: string;
  name: string;
  forums: ForumArea[];
}

// 1. Lọc ra danh sách các trường độc nhất
const uniqueSchoolsMap = new Map<string, any>();
mockUniversities.forEach(u => {
  if (!uniqueSchoolsMap.has(u.name)) {
    uniqueSchoolsMap.set(u.name, {
      name: u.name,
      logoUrl: u.logoUrl || '',
      address: u.address || '',
      description: u.description || `Khu vực thảo luận dành cho sinh viên và cựu sinh viên ${u.name}`
    });
  }
});

const uniqueSchools = Array.from(uniqueSchoolsMap.values());

// 2. Các Template sinh dữ liệu
const threadTitles = [
  "Review chi tiết cơ sở vật chất của {Tên Trường} sau 1 kỳ học",
  "Học phí {Tên Trường} năm nay tăng ác quá các bác nhỉ?",
  "Xin kinh nghiệm phỏng vấn CLB ở {Tên Trường}",
  "Năm nhất {Tên Trường} có nên mua laptop gaming không?",
  "Thầy cô ở {Tên Trường} có dễ tính không mọi người?",
  "Cảnh báo: Sinh viên {Tên Trường} cẩn thận lừa đảo phòng trọ khu vực này!",
  "Góc tâm sự: Mới vào {Tên Trường} mà đã thấy ngợp vì các bạn quá giỏi...",
  "Học bổng khuyến khích học tập {Tên Trường} yêu cầu GPA bao nhiêu?",
  "Xin review căn tin {Tên Trường}, đồ ăn có ngon không?",
  "Nên thi IELTS trước hay đợi vào {Tên Trường} học tiếng Anh trường luôn?",
  "Chất lượng wifi ở {Tên Trường} dạo này chán quá!",
  "Có anh chị nào học ngành hot ở {Tên Trường} cho em xin ít review ạ",
  "Đời sống sinh viên {Tên Trường} có năng động như lời đồn?",
  "Thủ tục bảo lưu kết quả ở {Tên Trường} có phức tạp không?",
  "Kinh nghiệm sống sót qua mùa thi cuối kỳ tại {Tên Trường}"
];

const tags = ["Review", "Tư vấn", "Học phí", "Đời sống", "Học tập", "Kinh nghiệm", "Góc Than Vãn"];

const replyTemplates = [
  "Đồng ý với bác, em cũng đang mệt mỏi với vấn đề này đây.",
  "Tùy người thôi bạn ơi, mình thấy bình thường mà nhỉ?",
  "Bài viết rất hữu ích, cảm ơn chủ thớt đã chia sẻ nhé!",
  "Kinh nghiệm xương máu là nên chuẩn bị từ sớm nha các em 2k8.",
  "Trường mình dạo này thay đổi nhiều quá, tốt hơn xưa nhiều.",
  "Đừng nghe mấy lời dọa dẫm, cứ tự tin mà trải nghiệm đi em.",
  "Vụ này căng, hóng các cao nhân vào giải đáp thêm.",
  "Mình K65 đây, xác nhận thông tin này là chuẩn 100% nhé.",
  "Mức phí đó so với mặt bằng chung là hợp lý rồi bạn.",
  "Nếu không chịu được áp lực thì nên suy nghĩ lại nhé.",
  "Có ai giống tôi không, đọc xong mới biết luôn á =)))",
  "Ghim bài này lại để dành mốt có lúc cần dùng tới."
];

const authors = ["sinhvien_chamchi", "boy_coder_99", "girl_marketing", "alumni_hust", "tan_sinh_vien_2k8", "rich_kid_sg", "chuyen_gia_hoc_bong", "chua_te_deadline"];
const avatars = [
  "https://i.pravatar.cc/150?u=1", 
  "https://i.pravatar.cc/150?u=2", 
  "https://i.pravatar.cc/150?u=3", 
  "https://i.pravatar.cc/150?u=4", 
  "https://i.pravatar.cc/150?u=5", 
  "https://i.pravatar.cc/150?u=6", 
  "https://i.pravatar.cc/150?u=7", 
  "https://i.pravatar.cc/150?u=8"
];

// Simple seeded random function to prevent hydration mismatch
let seed = 12345;
function seededRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Helper function để bốc ngẫu nhiên
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(seededRandom() * arr.length)];
}
function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

const allGeneratedThreads: Thread[] = [];
let threadIdCounter = 1;
let replyIdCounter = 1;

// 3. Phân loại theo Khu vực
const northernForums: ForumArea[] = [];
const southernForums: ForumArea[] = [];
const centralForums: ForumArea[] = [];

uniqueSchools.forEach((school, index) => {
  const generatedThreads: Thread[] = [];
  
  // Tạo 5 threads cho trường này
  for (let i = 0; i < 5; i++) {
    const threadReplies: Reply[] = [];
    const numReplies = 3;
    
    for (let j = 0; j < numReplies; j++) {
      threadReplies.push({
        id: `r_${replyIdCounter++}`,
        author: randomChoice(authors),
        avatar: randomChoice(avatars),
        role: randomChoice(["Thành viên", "Cựu sinh viên", "Sinh viên năm 1", "Sinh viên năm 4"]),
        content: randomChoice(replyTemplates),
        createdAt: `${randomInt(1, 50)} mins ago`,
        likes: randomInt(0, 50)
      });
    }

    const t: Thread = {
      id: `t_${threadIdCounter++}`,
      title: randomChoice(threadTitles).replace("{Tên Trường}", school.name),
      author: randomChoice(authors),
      avatar: randomChoice(avatars),
      tag: randomChoice(tags),
      repliesCount: randomInt(10, 500),
      viewsCount: `${randomInt(1, 100)}K`,
      createdAt: i === 0 ? '10 minutes ago' : `${randomInt(1, 23)} hours ago`,
      isSticky: i === 0,
      replies: threadReplies
    };
    
    generatedThreads.push(t);
    allGeneratedThreads.push(t);
  }

  const forum: ForumArea = {
    id: `f_${index}`,
    name: school.name,
    avatar: school.logoUrl,
    description: school.description,
    threadsCount: `${randomInt(5, 50)}K`,
    messagesCount: `${randomInt(100, 999)}K`,
    latestThread: generatedThreads[0],
    threads: generatedThreads
  };

  // Phân vùng
  const addr = school.address.toLowerCase();
  if (addr.includes('hà nội') || addr.includes('hải phòng') || addr.includes('quảng ninh') || addr.includes('thái nguyên')) {
    northernForums.push(forum);
  } else if (addr.includes('hồ chí minh') || addr.includes('hcm') || addr.includes('cần thơ') || addr.includes('bình dương') || addr.includes('đồng nai')) {
    southernForums.push(forum);
  } else {
    centralForums.push(forum); // Miền trung hoặc không xác định
  }
});

export const mockCategories: Category[] = [];

if (northernForums.length > 0) {
  mockCategories.push({
    id: "cat_northern",
    name: "Đại học Khu vực Miền Bắc",
    forums: northernForums
  });
}
if (centralForums.length > 0) {
  mockCategories.push({
    id: "cat_central",
    name: "Đại học Khu vực Miền Trung & Khác",
    forums: centralForums
  });
}
if (southernForums.length > 0) {
  mockCategories.push({
    id: "cat_southern",
    name: "Đại học Khu vực Miền Nam",
    forums: southernForums
  });
}

// 4. Lấy ngẫu nhiên 5 threads cho Trending Content
const shuffled = [...allGeneratedThreads].sort((a, b) => {
  // Sort with pseudo-random based on id to be deterministic
  const aHash = a.id.charCodeAt(a.id.length - 1);
  const bHash = b.id.charCodeAt(b.id.length - 1);
  return (aHash - bHash) * (seededRandom() > 0.5 ? 1 : -1);
});
export const mockTrendingThreads: Thread[] = shuffled.slice(0, 5);

export const addMockThread = (forumId: string, thread: Thread) => {
  // Thêm vào trending
  mockTrendingThreads.unshift(thread);
  if (mockTrendingThreads.length > 10) mockTrendingThreads.pop();
  
  // Thêm vào forum cụ thể
  for (const cat of mockCategories) {
    const forum = cat.forums.find(f => f.id === forumId);
    if (forum) {
      if (!forum.threads) forum.threads = [];
      forum.threads.unshift(thread);
      forum.latestThread = thread;
      // Cập nhật số liệu fake
      const currentCount = parseInt(forum.threadsCount.replace(/[^0-9]/g, '')) || 0;
      forum.threadsCount = `${currentCount + 1}K`;
      break;
    }
  }
};

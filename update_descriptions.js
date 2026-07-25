const fs = require('fs');

const descriptions = {
  "Công nghệ thông tin": "Ngành Công nghệ thông tin tập trung vào việc nghiên cứu phần mềm, mạng lưới internet và hệ thống máy tính. Sinh viên được trang bị các kỹ năng lập trình, phân tích dữ liệu và thiết kế giải pháp công nghệ.",
  "Khoa học máy tính": "Ngành Khoa học máy tính đi sâu vào lý thuyết thuật toán, trí tuệ nhân tạo và kiến trúc hệ thống. Đây là nền tảng cốt lõi để tạo ra các công nghệ đột phá trong kỷ nguyên số.",
  "Kỹ thuật Robot": "Chuyên ngành đào tạo chuyên sâu về thiết kế, chế tạo và vận hành các hệ thống tự động hóa. Người học sẽ làm chủ các công nghệ cơ điện tử kết hợp AI ứng dụng trong sản xuất.",
  "Toán học": "Cung cấp nền tảng tư duy logic, mô hình hóa và phân tích định lượng. Sinh viên tốt nghiệp có thể làm việc trong các viện nghiên cứu, giáo dục hoặc ứng dụng vào khoa học dữ liệu và tài chính.",
  "Hóa học": "Nghiên cứu cấu trúc, thuộc tính và sự biến đổi của vật chất. Ngành học mở ra cơ hội trong các lĩnh vực dược phẩm, mỹ phẩm, vật liệu mới và công nghệ môi trường.",
  "Sinh học": "Khám phá sự sống từ cấp độ phân tử đến hệ sinh thái. Các kiến thức này được ứng dụng mạnh mẽ trong công nghệ sinh học, nông nghiệp công nghệ cao và y sinh.",
  "Kỹ thuật máy tính": "Ngành học giao thoa giữa điện tử và công nghệ thông tin. Chú trọng vào việc thiết kế phần cứng, vi mạch và lập trình nhúng cho các thiết bị thông minh.",
  "Khoa học dữ liệu": "Trang bị kỹ năng khai phá, xử lý và trực quan hóa dữ liệu lớn (Big Data). Sinh viên ra trường sẽ trở thành những chuyên gia phân tích giúp doanh nghiệp ra quyết định chiến lược.",
  "Cơ điện tử": "Sự kết hợp hoàn hảo giữa cơ khí, điện tử và tin học. Sinh viên sẽ học cách thiết kế các hệ thống thông minh như máy móc tự động và robot công nghiệp.",
  "Quản trị kinh doanh": "Đào tạo kiến thức toàn diện về điều hành, tổ chức và quản lý doanh nghiệp. Ngành học giúp phát triển tư duy lãnh đạo, kỹ năng khởi nghiệp và xử lý tình huống thực tế.",
  "Kế toán": "Cung cấp hệ thống kiến thức về quản lý tài chính, lập báo cáo và kiểm toán. Đây là bộ phận không thể thiếu giúp theo dõi sức khỏe tài chính của mọi tổ chức, doanh nghiệp.",
  "Marketing": "Nghiên cứu thị trường, hành vi khách hàng và các chiến lược truyền thông. Ngành học trang bị sự sáng tạo và nhạy bén để xây dựng hình ảnh thương hiệu mạnh mẽ.",
  "Kinh tế đối ngoại": "Chuyên sâu về thương mại quốc tế, xuất nhập khẩu và thanh toán quốc tế. Sinh viên sẽ nắm vững các quy luật kinh tế toàn cầu để hội nhập và phát triển.",
  "Ngôn ngữ Anh": "Đào tạo chuyên sâu về ngôn ngữ, văn hóa và văn học Anh - Mỹ. Sinh viên có thể tự tin làm việc trong các môi trường đa quốc gia, biên phiên dịch hoặc giảng dạy.",
  "Tài chính quốc tế": "Nghiên cứu về tỷ giá, thị trường ngoại hối và quản trị rủi ro toàn cầu. Ngành học đáp ứng nhu cầu nhân lực chất lượng cao trong lĩnh vực tài chính xuyên biên giới.",
  "Y đa khoa": "Hành trình kéo dài 6 năm đào tạo bác sĩ với nền tảng y học vững chắc. Người học sẽ trải qua các kỳ thực tập lâm sàng khắt khe để trực tiếp khám chữa bệnh cứu người.",
  "Răng hàm mặt": "Chuyên ngành y học tập trung vào chẩn đoán, điều trị và phòng ngừa các bệnh lý vùng răng miệng. Đặc biệt chú trọng kỹ năng thực hành vi phẫu và thẩm mỹ nha khoa.",
  "Dược học": "Nghiên cứu về vòng đời của thuốc, từ bào chế, sản xuất đến phân phối và sử dụng. Đào tạo nên những dược sĩ đóng vai trò quan trọng trong hệ thống chăm sóc sức khỏe.",
  "Tài chính ngân hàng": "Nghiên cứu dòng tiền, hoạt động tín dụng và quản trị rủi ro đầu tư. Ngành học cung cấp tư duy nhạy bén với những biến động của thị trường chứng khoán và vốn.",
  "Hệ thống thông tin quản lý": "Cầu nối giữa công nghệ và quản trị doanh nghiệp. Sinh viên sẽ học cách ứng dụng phần mềm để tối ưu hóa quy trình hoạt động và quản lý nguồn lực hiệu quả.",
  "Tài chính doanh nghiệp": "Tập trung phân tích báo cáo tài chính, thẩm định dự án và tối ưu hóa nguồn vốn cho công ty. Đóng vai trò cố vấn chiến lược để tối đa hóa lợi nhuận kinh doanh.",
  "Kế toán doanh nghiệp": "Trang bị kỹ năng ghi chép, xử lý và cung cấp thông tin tài chính chi tiết của doanh nghiệp. Đảm bảo tính minh bạch và tuân thủ các quy định về thuế hiện hành.",
  "An toàn thông tin": "Đào tạo các chuyên gia bảo vệ dữ liệu mạng, phòng chống tấn công an ninh mạng và mã độc. Đóng vai trò sống còn trong kỷ nguyên số hóa bảo mật toàn cầu.",
  "Công nghệ đa phương tiện": "Kết hợp giữa tư duy thiết kế nghệ thuật và công nghệ thông tin. Sinh viên sẽ tạo ra các sản phẩm truyền thông số tương tác như game, web, và video.",
  "Kỹ thuật phần mềm": "Tập trung vào toàn bộ quy trình thiết kế, phát triển và bảo trì phần mềm. Trang bị khả năng xây dựng các ứng dụng chất lượng cao, đáp ứng nhu cầu thực tiễn.",
  "Thiết kế đồ họa": "Sử dụng các công cụ phần mềm để truyền tải thông điệp bằng hình ảnh. Ngành học khơi nguồn sáng tạo không giới hạn trong lĩnh vực quảng cáo, xuất bản và nhận diện thương hiệu.",
  "Quản trị khách sạn": "Đào tạo nghiệp vụ lưu trú, ẩm thực và quản lý dịch vụ chuẩn quốc tế. Sinh viên sẽ được thực hành liên tục để mang lại trải nghiệm hoàn hảo cho khách hàng.",
  "Kỹ thuật công trình xây dựng": "Nghiên cứu thiết kế, thi công và quản lý các dự án hạ tầng. Là những kỹ sư đứng sau các tòa nhà, cây cầu và công trình kiến trúc vững chãi.",
  "Công nghệ kỹ thuật ô tô": "Tích hợp kiến thức cơ khí, điện tử và điều khiển ô tô. Ngành học bắt kịp xu hướng phát triển mạnh mẽ của xe điện và xe tự lái trong tương lai.",
  "Cơ khí": "Nền tảng của khối ngành kỹ thuật, chuyên về chế tạo máy, gia công vật liệu và thiết kế khuôn mẫu. Là động lực chính thúc đẩy sự phát triển của nền công nghiệp nặng.",
  "Du lịch": "Nghiên cứu về địa lý, văn hóa và tuyến điểm du lịch. Đào tạo những người làm điều hành tour và hướng dẫn viên kết nối các giá trị văn hóa đến với du khách.",
  "Kỹ thuật xây dựng": "Chuyên sâu vào khả năng chịu lực, vật liệu thi công và biện pháp xây dựng an toàn. Kỹ sư ngành này là người đảm bảo sự kiên cố cho mọi dự án hạ tầng.",
  "Logistics": "Quản lý chuỗi cung ứng, kho bãi và vận tải hàng hóa trong nước lẫn quốc tế. Ngành học cốt lõi giúp luân chuyển mạch máu nền kinh tế thương mại toàn cầu.",
  "Kiến trúc": "Sự kết hợp tinh tế giữa nghệ thuật không gian và kỹ thuật kết cấu. Kiến trúc sư là những người kiến tạo nên môi trường sống đẹp mắt, tiện nghi và bền vững.",
  "Kỹ thuật cấp thoát nước": "Chuyên về thiết kế hệ thống xử lý nước và bảo vệ môi trường đô thị. Đóng vai trò quan trọng trong việc quy hoạch hạ tầng và phát triển sinh thái bền vững.",
  "Kỹ thuật dầu khí": "Nghiên cứu quá trình thăm dò, khai thác và lọc hóa dầu. Ngành học đào tạo chuyên gia kỹ thuật làm việc trong môi trường biển, đóng góp lớn cho an ninh năng lượng.",
  "Bản đồ": "Tập trung vào trắc địa, đo đạc không gian và ứng dụng GIS. Cung cấp dữ liệu chính xác phục vụ cho quy hoạch đô thị, quản lý đất đai và tài nguyên.",
  "Thương mại điện tử": "Nghiên cứu mô hình kinh doanh trực tuyến, tiếp thị số và vận hành các nền tảng e-commerce. Sinh viên sẽ đón đầu xu hướng mua sắm của tương lai số.",
  "Quản trị nhân lực": "Chuyên môn về thu hút, phát triển và giữ chân nhân tài cho doanh nghiệp. Nghề của sự thấu hiểu tâm lý và quản lý chế độ phúc lợi để xây dựng văn hóa công ty.",
  "Ngôn ngữ Trung Quốc": "Trang bị kỹ năng giao tiếp tiếng Trung và am hiểu văn hóa Trung Hoa. Mở rộng cơ hội việc làm tại các tập đoàn thương mại quốc tế, du lịch và ngoại giao.",
  "Ngôn ngữ Hàn Quốc": "Đào tạo tiếng Hàn chuyên sâu cùng kiến thức về văn hóa, kinh tế Hàn Quốc. Sinh viên dễ dàng nắm bắt cơ hội việc làm nhờ làn sóng đầu tư mạnh mẽ từ Hàn Quốc.",
  "Quản trị dịch vụ du lịch": "Quản lý toàn diện các mảng lữ hành, sự kiện và dịch vụ giải trí. Cung cấp tư duy chiến lược để phát triển các sản phẩm du lịch chất lượng cao.",
  "Báo in": "Nền tảng của ngành truyền thông, tập trung vào kỹ năng lấy tin, phỏng vấn và viết bài chuyên sâu. Đào tạo nên những nhà báo với tư duy nhạy bén và ngòi bút sắc sảo.",
  "Truyền thông đại chúng": "Nghiên cứu sự ảnh hưởng của thông tin lên cộng đồng thông qua đa nền tảng. Cung cấp tầm nhìn chiến lược để định hướng và quản trị thông điệp truyền thông.",
  "Quan hệ công chúng": "Nghệ thuật xây dựng và bảo vệ hình ảnh thương hiệu trong mắt công chúng. Sinh viên được rèn luyện kỹ năng xử lý khủng hoảng và kết nối với báo chí.",
  "Sư phạm Toán": "Đào tạo giáo viên dạy Toán với kiến thức học thuật sâu rộng và kỹ năng sư phạm hiện đại. Là người gieo hạt giống tư duy logic cho các thế hệ học sinh.",
  "Sư phạm Tiếng Anh": "Trang bị phương pháp giảng dạy tiếng Anh tiên tiến và chuẩn mực. Sinh viên ra trường đóng vai trò nòng cốt trong việc toàn cầu hóa giáo dục ngôn ngữ.",
  "Đạo diễn": "Ngành học nghệ thuật chuyên biệt về dàn dựng, kể chuyện bằng ngôn ngữ điện ảnh và sân khấu. Đào tạo ra những người dẫn dắt linh hồn của mỗi tác phẩm.",
  "Diễn viên": "Trang bị kỹ năng hình thể, đài từ và diễn xuất tâm lý nhân vật. Đào tạo nên những nghệ sĩ tỏa sáng trên sân khấu, truyền hình và màn ảnh rộng."
};

function processFile(filename) {
  let content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  
  let currentMajor = '';
  
  for (let i = 0; i < lines.length; i++) {
    const majorMatch = lines[i].match(/major:\s*['"]([^'"]+)['"]/);
    if (majorMatch) {
      currentMajor = majorMatch[1];
    }
    
    // if we find a description line and we know the major
    if (currentMajor && lines[i].trim().startsWith('description:')) {
      const desc = descriptions[currentMajor];
      if (desc) {
        // match indentation
        const indentMatch = lines[i].match(/^\s*/);
        const indent = indentMatch ? indentMatch[0] : '    ';
        lines[i] = indent + `description: "${desc}",`;
      }
    }
  }
  
  fs.writeFileSync(filename, lines.join('\n'));
}

processFile('src/data/mockUniversities.ts');
processFile('src/data/massiveUniversities.ts');
console.log('Descriptions updated!');

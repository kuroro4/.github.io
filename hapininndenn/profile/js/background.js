const img = ["https://dubdesign.net/wp-content/uploads/2022/01/pagereload.jpg", "https://dubdesign.net/wp-content/uploads/2022/01/javaprogless.jpg", "https://dubdesign.net/wp-content/uploads/2021/12/cookiewrite.jpg"];
let count = -1;
picChange();
function picChange() {
  count++;
  if (count == img.length) count = 0;
  //画像選択
  changePic.src = img[count];
  //秒数の指定
  setTimeout("picChange()", 4005);
}

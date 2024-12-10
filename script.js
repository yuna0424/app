"use strict";

const guideFrame = document.querySelector(".guide-frame"); //前面
const guideFrameB = document.querySelector(".guide-frameB"); //背面
const guideframe2 = document.querySelector(".guide-frame2"); //袖

let dataURL;

//これは袖切り抜き用で、3班には送らない、長いIMGデータ
let IMG1; //前面画像を入れる
let IMG2; //背面画像を入れる
let sleeveDataUrl; //袖画像２個入れる

//ここから上部メニュー関連
const menuIcon = document.getElementById("menu-icon");
const backbutton = document.getElementById("back-button");

// インジケーター画像URLリスト
const IndicatorList = [
  "images/indicator_1.png", // テンプレート選択 scr2
  "images/indicator_2.png", // 前面撮影 scr3 scr4
  "images/indicator_3.png", // 撮影画像の確認（１） scr5
  "images/indicator_4.png", // 背面撮影 scr6
  "images/indicator_5.png", // 撮影画像の確認（２）  scr7
  "images/indicator_6.png", // 袖のデザイン scr8 scr9 scr10
  "images/indicator_7.png", // 完成 scr11 scr12
  "images/Appname.png", //アプリタイトル scr0
];

//インジケーター
const indicator = document.getElementById("indicator");
function updateIndicator(scr) {
  // インデックスが8の場合は何も表示しない
  if (scr === 8) {
    indicator.innerHTML = ""; // 既存の内容をクリア
    return; // 画像を追加せずに終了
  }

  const imgSrc = IndicatorList[scr]; // 選ばれた画像のURLを取得
  // 画像を挿入
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = `Indicator画像${scr + 1}`; // 画像の代替テキストを設定

  // 既存の内容をクリアして画像を追加
  indicator.innerHTML = ""; // 既存の内容をクリア
  indicator.appendChild(img);
}

//画面遷移（表示非表示）の設定
let screenCount = 0;
const screennum = document.getElementsByClassName("scr");
console.log(screennum); //確認用コンソール

function showScreen(index) {
  for (let i = 0; i < screennum.length; i++) {
    screennum[i].style.display = i === index ? "block" : "none";
  }

  if (index === 0) {
    backbutton.style.display = "none";
    menuIcon.style.display = "none";
  } else {
    backbutton.style.display = "block";
    menuIcon.style.display = "block";
  }

  if (index === 0) {
    updateIndicator(7);
    //タイトル文字
  } else if (index === 1) {
    updateIndicator(8);
    //インジケーターなし
  } else if (index === 2) {
    updateIndicator(0);
  } else if (index === 3) {
    updateIndicator(1);
  } else if (index === 4) {
    updateIndicator(1);
  } else if (index === 5) {
    updateIndicator(2);
  } else if (index === 6) {
    updateIndicator(3);
  } else if (index === 7) {
    updateIndicator(4);
  } else if (index === 8) {
    updateIndicator(5);
  } else if (index === 9) {
    updateIndicator(5);
  } else if (index === 10) {
    updateIndicator(5);
  } else if (index === 11) {
    updateIndicator(6);
  } else if (index === 12) {
    updateIndicator(6);
  }
}

// 初期表示
showScreen(screenCount);

//画面遷移（表示）を関数に。
function ScreenTransition(n) {
  screenCount = n;
  console.log(screenCount);
  showScreen(screenCount);
}

//メニュータブからの画面遷移を制御
let seni = 0;

//メニューでるアイコン
document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("overlay");

  menuIcon.addEventListener("click", function () {
    // メニューの表示状態をトグルする
    if (navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      navMenu.style.height = "0"; // メニューを非表示にするとき高さを0に
      backButton.style.opacity = 1; //戻るボタンが可視化
      backbtn = true;

      overlay.classList.remove("show"); // オーバーレイを非表示
    } else {
      navMenu.classList.add("show");
      navMenu.style.height = navMenu.scrollHeight + "px"; // メニューの高さを内容に合わせて設定
      //戻るボタンを押せなくする
      backbtn = false;
      backButton.style.opacity = 0;
      overlay.classList.add("show"); // オーバーレイを表示
    }
  });

  //メニュー遷移先設定
  const li1 = document.getElementById("li1").addEventListener("click", () => {
    // screenCount = 1;
    // updateIndicator(8); //インジケーターなし＝8
    // console.log(screenCount);
    // showScreen(screenCount);
    ScreenTransition(1);
  });

  const li2 = document.getElementById("li2").addEventListener("click", () => {
    seni = screenCount; //戻ってくる画面を代入する
    //後に撮影方法画面に変更
    ScreenTransition(13);
    // screenCount = 13;
    // //概要
    // console.log(screenCount);
    // showScreen(screenCount);
  });
  const li3 = document.getElementById("li3").addEventListener("click", () => {
    seni = screenCount; //戻ってくる画面を代入する

    //後に利用規約画面に変更
    ScreenTransition(14);
    // screenCount = 14;
    // //規約
    // console.log(screenCount);
    // showScreen(screenCount);
  });
  const TabBack = document.querySelectorAll(".TabBack");
  console.log("tab" + TabBack);
  // 各ボタンにクリックイベントリスナーを追加
  TabBack.forEach((TabBack) => {
    TabBack.addEventListener("click", () => {
      if (screenCount !== 13 && screenCount !== 14) {
        // タブの規約or概要ではない＝エラー時の対処
        console.log("エラーのため最初にもどる");
        window.alert("エラーのため最初にもどる");
        screenCount = 1;
        showScreen(screenCount);
      } else {
        // タブの規約or概要で前に戻るボタンを押す
        console.log("前画面=" + seni);
        screenCount = seni;
        console.log(screenCount);
        showScreen(screenCount);
      }
    });
  });
  // オーバーレイをクリックしたときにメニューとオーバーレイを非表示にする
  overlay.addEventListener("click", function () {
    navMenu.classList.remove("show");
    navMenu.style.height = "0"; // メニューを非表示にするとき高さを0に
    overlay.classList.remove("show"); // オーバーレイを非表示
  });
});

//戻るボタン
var backbtn = true;
const backButton = document.getElementById("back-button");
backButton.addEventListener("click", function () {
  if (backbtn) {
    if (screenCount == 5) {
      //前面確認画面
      ScreenTransition(4);
    } else if (screenCount == 7) {
      //背面確認画面
      ScreenTransition(6);
    } else if (screenCount == 11) {
      //最終確認画面
      if ((seni = 7)) {
        //背面時
        updateIndicator(4);
      } else if ((seni = 10)) {
        //袖からきたとき
        updateIndicator(5);
      }
      screenCount = seni;

      showScreen(screenCount);
    } else if (screenCount == 13) {
      //概要
      console.log("前画面=" + seni);
      screenCount = seni;
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount == 14) {
      //規約
      console.log("前画面=" + seni);
      screenCount = seni;
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount > 0) {
      //他の画面（規約以外）
      screenCount--;
      ScreenTransition(screenCount);
    }
  }
});

//スタートボタン 最初の画面　scr0
const kiyakudoui = document
  .getElementById("kiyakudoui")
  .addEventListener("click", () => {
    ScreenTransition(1);
  });

//服の種類と撮影方法選択　scr1
let katagami = 0;
//↑型紙の種類がトップス＝1,ボトムス＝2

//トップスボトムスの階層ボタン↓
// 子ボタングループをトグル表示する関数
function toggleVisibility(buttonGroupId) {
  // すべての子ボタングループを取得
  const allButtonGroups = document.querySelectorAll(".hidden-buttons");

  // 指定されたIDの子ボタングループを取得
  const targetGroup = document.getElementById(buttonGroupId);

  let anyButtonGroupVisible = false; //dress用

  // 各子ボタングループについて処理
  allButtonGroups.forEach((group) => {
    if (group === targetGroup) {
      // トグル表示
      group.style.display = group.style.display === "block" ? "none" : "block";
      if (group.style.display === "block") {
        anyButtonGroupVisible = true;
      }
      if (buttonGroupId === "tops-buttons") {
        const hiddenbottom = document.getElementById("hiddenbottom");
        hiddenbottom.style.display =
          hiddenbottom.style.display === "none" ? "block" : "none";
      }
    } else {
      // 他の子ボタングループは非表示にする
      group.style.display = "none";
    }
  });
  // `#dress` ボタンの表示/非表示を設定
  document.getElementById("dress").style.display = anyButtonGroupVisible
    ? "none"
    : "block";
}

//内カメ外カメ設定ボタン　階層の子ボタンに。
//内↓
const incamera = document.getElementById("incamera");

incamera.addEventListener("click", () => {
  //トップス内カメ
  katagami = 1;
  katagamiEvent();

  ScreenTransition(2);
});
//外カメ
const outcamera = document
  .getElementById("outcamera")
  .addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();
    //トップス外カメ
    katagami = 1;
    katagamiEvent();

    ScreenTransition(2);
  });
const bottom_outcamera = document
  .getElementById("bottom_outcamera")
  .addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();
    //ボトムス
    katagami = 2;
    katagamiEvent();

    ScreenTransition(2);
  });

//使用できる型紙の情報リスト
//トップスの選択肢
let topstemp = [
  {
    name: "ショート丈Tシャツ",
    src: "images/shortT_icon.png",
    front: "images/shortT_front.png",
    back: "images/shortT_back.png",
    sleeve: "images/shortT_sleeve.png",
  },
  {
    name: "オーバーサイズTシャツ",
    src: "images/bigSilhouette_icon.png",
    front: "images/bigSilhouette_front.png",
    back: "images/bigSilhouette_back.png",
    sleeve: "images/bigSilhouette_sleeve.png",
  },
  {
    name: "パーカー",
    src: "images/hoodie_icon.png",
    front: "images/hoodie_front.png",
    back: "images/hoodie_back.png",
    sleeve: "images/hoodie_sleeve.png",
  },
  {
    name: "シャツ・ブラウス",
    src: "images/longSleeve_icon.png",
    front: "images/longSleeve_front.png",
    back: "images/longSleeve_back.png",
    sleeve: "images/longSleeve_sleeve.png",
  },
  {
    //テンプレートを使用しない
    src: "images/non_temp.png",
    front: "Coming soon",
    back: "",
    sleeve: "",
  },
];
//ボトムスの選択肢
let bottomstemp = [
  {
    name: "台形ミニスカート",
    src: "images/miniskirt_icon.png",
    front: "images/miniskirt_front.png",
    back: "images/miniskirt_back.png",
  },
  {
    name: "パンツ",
    src: "images/pants_icon.png",
    front: "images/pants_front.png",
    back: "images/pants_back.png",
  },
  {
    //テンプレートを使用しない
    src: "images/non_temp.png",
    front: "Coming soon",
    back: "",
  },
];
let katagamiFreamchangefront = "frontfreame";
let katagamiFreamchangeback = "backfreame";
let katagamiFreamchangesleeve = "sleevefreame";
let templateName = "テンプレート名";

//横スクロールの型紙一覧表示　scr2
function katagamiEvent() {
  // JavaScriptでボタンを挿入するコード
  const f_area = document.querySelector(".f_area");

  // 既存のボタンを削除
  while (f_area.firstChild) {
    f_area.removeChild(f_area.firstChild);
  }
  let data;
  if (katagami == 1) {
    //トップスの場合
    data = null;
    //初期化してから入れる
    data = topstemp; // トップスデータを使用
    document.querySelector(".f_area").style.width = "1250px";
  } else if (katagami == 2) {
    //ボトムスの場合
    data = null;
    //初期化してから入れる
    data = bottomstemp; // ボトムスデータを使用
    document.querySelector(".f_area").style.width = "750px";
  } else if (katagami > 2) {
    window.alert("型紙がありません");
  }
  // ▽▽9/13変更
  data.forEach((item) => {
    // 新しいボタン要素を作成
    const button = document.createElement("button");
    button.style.all = "unset";

    // 画像要素を作成
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = "Image Button";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    // img.style.transition = "transform .5s";

    // ボタンに画像を追加
    button.appendChild(img);
    // ボタンのクリックイベントを設定
    button.addEventListener("click", () => {
      katagamiFreamchange(item.front, item.back);
      katagamiFreamchangefront = item.front;
      katagamiFreamchangeback = item.back;
      templateName = item.name;
      if (katagami === 1) {
        katagamiFreamchangesleeve = item.sleeve;
      }
    });
    // コンテナにボタンを追加
    console.log(f_area);
    f_area.appendChild(button);
  });
}
//ここで、型紙に応じたフレームを撮影画面でだす。3班に渡す値かもしれない
function katagamiFreamchange(x, y) {
  ScreenTransition(3);
  console.log(x);
  const newImageUrl_front = x; //frontフレームのURL
  const newImageUrl_back = y; //backフレームのURL

  // 画像要素のsrc属性を変更
  guideFrame.setAttribute("src", newImageUrl_front);

  // 画像要素のsrc属性を変更

  guideFrameB.setAttribute("src", newImageUrl_back);
}

//撮影時の注意　scr3
//撮影開始ボタンにて、前面カメラ画面への切り替え
const startshoot = document
  .getElementById("startshoot")
  .addEventListener("click", () => {
    ScreenTransition(4);
  });

//前面撮影のカメラ準備　scr4
//カメラ系統準備↓
navigator.mediaDevices.getUserMedia({ video: true });

let currentStream;
let isFrontCamera = true; //初期は内カメ
let captureCount = 0; //撮影２回するため。

function startCamera() {
  const constraints = {
    video: {
      facingMode: isFrontCamera ? "user" : "environment",
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
      currentStream = stream;
      const video = document.getElementById("video");
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error("カメラにアクセスできませんでした:", error);
    });
}

//ガイドフレームの多色化ボタン（videoタップ)
let framecolor = "red"; //初期値
function appendColorToFileName(fileName, color) {
  // 拡張子を分離
  const parts = fileName.split(".");
  const baseName = parts[0];
  const extension = parts[1];

  // 色を追加して新しいファイル名を作成
  const newFileName = `${baseName}_${color}.${extension}`;
  return newFileName;
}
const cameracontainer = document.querySelectorAll(".camera-container");

cameracontainer.forEach((container) => {
  container.addEventListener("click", () => {
    // addEventListener("click", () => {
    if (framecolor == "red") {
      //前面
      // ここに新しい画像のURL_白を指定
      const newImageUrl = appendColorToFileName(
        katagamiFreamchangefront,
        "white"
      );
      // 画像要素のsrc属性を変更
      guideFrame.setAttribute("src", newImageUrl);

      //背面
      // ここに新しい画像のURL_白を指定
      const newImageUrl2 = appendColorToFileName(
        katagamiFreamchangeback,
        "white"
      );
      // 画像要素のsrc属性を変更
      guideFrameB.setAttribute("src", newImageUrl2);
      framecolor = "white";

      //袖　
      const newImageUrl3 = appendColorToFileName(
        katagamiFreamchangesleeve,
        "white"
      );
      // 画像要素のsrc属性を変更
      guideframe2.setAttribute("src", newImageUrl3);
      framecolor = "white";

    } else if (framecolor == "white") {
      // ここに新しい画像のURL_黒を指定
      const newImageUrl = appendColorToFileName(
        katagamiFreamchangefront,
        "black"
      );
      // 画像要素のsrc属性を変更
      guideFrame.setAttribute("src", newImageUrl);

      // ここに新しい画像のURL_黒を指定
      const newImageUrl2 = appendColorToFileName(
        katagamiFreamchangeback,
        "black"
      );
      // 画像要素のsrc属性を変更
      guideFrameB.setAttribute("src", newImageUrl2);
      framecolor = "black";

      //袖　
      const newImageUrl3 = appendColorToFileName(
        katagamiFreamchangesleeve,
        "black"
      );
      // 画像要素のsrc属性を変更
      guideframe2.setAttribute("src", newImageUrl3);
      framecolor = "black";
    } else {
      // ここに新しい画像のURL_黒を指定
      const newImageUrl = katagamiFreamchangefront;
      // 画像要素のsrc属性を変更
      guideFrame.setAttribute("src", newImageUrl);

      // ここに新しい画像のURL_黒を指定
      const newImageUrl2 = katagamiFreamchangeback;
      // 画像要素のsrc属性を変更
      guideFrameB.setAttribute("src", newImageUrl2);
      framecolor = "red";

      //袖　
      const newImageUrl3 = katagamiFreamchangesleeve;
      // 画像要素のsrc属性を変更
      guideframe2.setAttribute("src", newImageUrl3);
      framecolor = "red";
    }
  });
});

//撮影処理
function captureImage() {
  //撮影と、画像表示のイベント
  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  const context = canvas.getContext("2d");

  // 画像を水平に反転する(内カメのときだけ)
  if (isFrontCamera) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }
  // ビデオのサイズに合わせてキャンバスのサイズを設定
  // ビデオの表示サイズを取得
  const videoWidth = video.clientWidth;
  const videoHeight = video.clientHeight;

  // Canvas のサイズをビデオの表示サイズに合わせる
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  // キャンバスにビデオの内容を描画
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // ガイドフレームを描画9/14
  const guideFrame = document.querySelector(".guide-frame");
  const frameX = (canvas.width - guideFrame.width) / 2;
  const frameY = (canvas.height - guideFrame.height) / 2;
  console.log("video size" + video.width, video.height);
  console.log("canvas size" + canvas.width, canvas.height);
  console.log("guide size" + guideFrame.width, guideFrame.height);

  context.drawImage(
    guideFrame,
    frameX,
    frameY,
    guideFrame.width,
    guideFrame.height
  );

  //撮った画像 解像度をいじるならここ。袖用IMG1
  IMG1 = canvas.toDataURL("image/png");
  // キャプチャした画像をBlobとして取得
  canvas.toBlob((blob) => {
    if (blob) {
      const imageObjectURL = URL.createObjectURL(blob);

      // 撮影した画像を配列に追加
      if (imageBlobs.length > 4) {
        // 4つを超えた場合は
        window.alert("エラー：撮影画像が多すぎます");
        imageBlobs = [];
        ScreenTransition(1);
      } else {
        // 2番目の位置に代入
        const indexToInsert = 0; // 1番目:前面
         imageBlobs[0] = blob; // 直接代入
       
      
      }
      
      // 既存の<img>要素にBlobのURLを設定
      //前面撮影時なので
      const photoF = document.getElementById("photoF");
      // photoF.setAttribute("src", dataURL);
      photoF.src = imageObjectURL; // 画像のURLを設定
      photoF.alt = `IMG${imageBlobs.length}`; // 画像の識別名

      console.log("前面画像のURL:" + imageObjectURL); // BlobのURLを表示
    }
  }, "image/png");

  ScreenTransition(5);

  // ダウンロードリンクを設定する
  // const downloadButton = document.getElementById("download");
  // downloadButton.href = dataURL;

  //画像に名前をつけて、ダウンロード可能に
  // downloadButton.download = "captured_image.png";
}
//初期からスタートさせる
startCamera();

//内カメ外カメのトグル
document.getElementById("toggle-camera").addEventListener("click", () => {
  isFrontCamera = !isFrontCamera;
  startCamera();
});

//撮影ボタン
document.getElementById("capture").addEventListener("click", () => {
  // タイマーの追加
  const timer = document.getElementById("timer");
  let count = 5;
  timer.style.display = "block"; // タイマーを表示

  // タイマーを更新する関数
  function updateTimer() {
    timer.textContent = count;
    if (count === 0) {
      clearInterval(countdown);
      timer.style.display = "none"; // タイマーを非表示
      captureImage(); // 写真を撮影
    }
    count--;
  }

  updateTimer(); // 初期カウントを表示
  let countdown = setInterval(updateTimer, 1000); // 1秒ごとにカウントダウン
});

//前面のプレビュー　scr5
//次の撮影に進むボタン
const nextshoot = document
  .getElementById("nextshoot")
  .addEventListener("click", () => {
    //前面画像をIMG1にいれる
    // IMG1 = dataURL;
    console.log(IMG1);
    ScreenTransition(6);
  });
//撮りなおすボタン 前面
const RetakeF = document
  .getElementById("RetakeF")
  .addEventListener("click", () => {
    //カメラ画面にもどるイベントをいれる
    ScreenTransition(4);
  });


//背面撮影画面　scr6
document.addEventListener("DOMContentLoaded", () => {
  const videoB = document.getElementById("videoB");
  const canvasB = document.getElementById("canvasB");
  const captureB = document.getElementById("captureB");
  const ctxB = canvasB.getContext("2d");
  // カメラを起動する関数
  async function startCamera() {
    const constraints = {
      video: {
        facingMode: isFrontCamera ? "user" : "environment",
      },
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoB.srcObject = stream;
    } catch (error) {
      console.error("カメラの起動に失敗しました:", error);
    }
  }
  // 撮影する処理
  function captureImage() {
    if (videoB.srcObject) {
      // 画像を水平に反転する(内カメのときだけ)
      if (isFrontCamera) {
        ctxB.translate(canvasB.width, 0);
        ctxB.scale(-1, 1);
      }
      // ビデオのサイズに合わせてキャンバスのサイズを設定
      // ビデオの表示サイズを取得
      const videoWidth = videoB.clientWidth;
      const videoHeight = videoB.clientHeight;

      // Canvas のサイズをビデオの表示サイズに合わせる
      canvasB.width = videoWidth;
      canvasB.height = videoHeight;
      // キャンバスにビデオの内容を描画
      ctxB.drawImage(videoB, 0, 0, canvasB.width, canvasB.height);

      // ガイドフレームを描画
      const frameX = (canvasB.width - 300) / 2;
      const frameY = (canvasB.height - 300) / 2;

      ctxB.drawImage(guideFrameB, frameX, frameY, 300, 300);

      //撮った画像 解像度をいじるならここ。袖用IMG2
      IMG2 = canvasB.toDataURL("image/png");
      // キャプチャした画像をBlobとして取得
      canvasB.toBlob((blob) => {
        if (blob) {
          const imageObjectURL = URL.createObjectURL(blob);

          // 撮影した画像を配列に追加
          if (imageBlobs.length > 4) {
            // 4つを超えた場合は
            window.alert("エラー：撮影画像が多すぎます");
            imageBlobs = [];
            ScreenTransition(1);
          } else {
            
              imageBlobs[1] = blob; // 直接代入
            
          }
          // 既存の<img>要素にBlobのURLを設定
          //背面撮影時なので
          const photoB = document.getElementById("photoB");
          photoB.src = imageObjectURL; // 画像のURLを設定
          photoB.alt = `IMG${imageBlobs.length}`; // 画像の識別名

          console.log("背面画像のURL:" + imageObjectURL); // BlobのURLを表示
        }
      }, "image/png");

      // const photoB = document.getElementById("photoB");
      // photoB.setAttribute("src", DataUrl_Back);
      //↓確認用コンソール
      // console.log("背面画像URL:", DataUrl_Back);
      //確認画面へ遷移

      ScreenTransition(7);
    } else {
      console.error("カメラのストリームが開始されていません。");
    }
  }

  //撮影ボタン
  captureB.addEventListener("click", () => {
    // タイマーの追加
    const timerB = document.getElementById("timerB");
    let count = 5;
    timerB.style.display = "block"; // タイマーを表示

    // タイマーを更新する関数
    function updateTimer() {
      timerB.textContent = count;
      if (count === 0) {
        clearInterval(countdown);
        timerB.style.display = "none"; // タイマーを非表示
        captureImage(); // 写真を撮影
      }
      count--;
    }

    updateTimer(); // 初期カウントを表示
    let countdown = setInterval(updateTimer, 1000); // 1秒ごとにカウントダウン
  });

  //内カメ外カメのトグル
  document.getElementById("toggle-cameraB").addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();
  });
  //画面遷移後何秒後に起動するという形に変更する
  // カメラの起動
 startCamera();
});

//背面プレビュー　scr7
//撮りなおすボタン 背面
const RetakeB = document
  .getElementById("RetakeB")
  .addEventListener("click", () => {
    //カメラ画面にもどるイベントをいれる
    ScreenTransition(6);
  });

//撮り終わる　ズボンはおわり、トップスは袖へ
const Shootingfinish = document
  .getElementById("Shootingfinish")
  .addEventListener("click", () => {
    //背面画像をIMG2にいれる
    // IMG2 = dataURL;
    //両方の確認
    console.log(IMG1);
    console.log(IMG2);
    console.log(imageBlobs.length);

    if (katagami == 1) {
      //トップスなので、袖画面に行く
      ScreenTransition(8);
    } else {
      //ボトムスなので、袖はスキップして、3,4番目にデータをいれてAPIに送信
      seni = screenCount;
      //これでいいか確認しなければならない9/29

      // 1番目のデータを3番目に複製
      imageBlobs.splice(2, 0, imageBlobs[0]);
      // 2番目のデータを4番目に複製
      imageBlobs.splice(3, 0, imageBlobs[1]);
      console.log(imageBlobs.length);
      sendImageDataToAPI();
      ScreenTransition(11); //袖飛ばして確認画面
    }
  });

//袖選択肢画面1　scr8

// 親ボタンをクリックしたときに対応する子ボタンをトグル表示する関数
function toggleChildButtons(childGroupId) {
  const allChildGroups = document.querySelectorAll(".child-buttons");
  const sleeveParent = document.getElementById("sleeveParent");

  // 各子ボタングループについて処理
  allChildGroups.forEach((group) => {
    if (group.id === childGroupId) {
      // トグル表示
      group.style.display = group.style.display === "block" ? "none" : "block";
      if (group.id === "sleeve1-yes") {
        console.log(sleeveParent.style.display);

        if (sleeveParent.style.display === "none") {
          sleeveParent.style.display = "block";
        } else {
          sleeveParent.style.display = "none";
        }
      }
    } else {
      // 他の子ボタングループは非表示にする
      group.style.display = "none";
    }
  });
}
function handleAnswer(answer, currentSleeve) {
  if (currentSleeve === "sleeve1") {
    if (answer === "yes") {
      console.log("yes");
      //質問3にうつる
      ScreenTransition(10);
    } else {
      //撮影に移る
      guideframe2.setAttribute("src", katagamiFreamchangesleeve);
      console.log(guideframe2);

      ScreenTransition(9);
    }
  } else if (currentSleeve === "sleeve2") {
    if (answer === "yes") {
      //   document.getElementById("sleeve3").style.display = "block";
      //質問3にうつる
      ScreenTransition(10);
    } else {
      window.alert("撮影を行う");
    }
  } else if (currentSleeve === "sleeve3") {
    if (answer === "yes") {
      window.alert("前面を使用");
      //きりぬき
      imageUrl = IMG1; // ここに画像のURLを指定
       // 1番目のデータを3番目に複製
      imageBlobs.splice(2, 0, imageBlobs[0]);
      // 2番目のデータを4番目に複製
      imageBlobs.splice(3, 0, imageBlobs[0]);
      console.log(imageBlobs.length);

      seni = screenCount; //戻ってくる画面を代入する
      sendImageDataToAPI();
      ScreenTransition(11);
    } else {
      window.alert("背面を使用");

      //きりぬき
      imageUrl = IMG2; // ここに画像のURLを指定
       // 1番目のデータを3番目に複製
      imageBlobs.splice(2, 0, imageBlobs[1]);
      // 2番目のデータを4番目に複製
      imageBlobs.splice(3, 0, imageBlobs[1]);
      console.log(imageBlobs.length)

      seni = screenCount; //戻ってくる画面を代入する
      sendImageDataToAPI();
      ScreenTransition(11);
    }
  }
}

//袖を撮影する　scr9
//袖撮影準備
document.addEventListener("DOMContentLoaded", () => {
  const video2 = document.getElementById("video2");
  const canvas2 = document.getElementById("canvas2");
  const capture2 = document.getElementById("capture2");
  const ctx = canvas2.getContext("2d");
  // カメラを起動する関数
  async function startCamera() {
    const constraints = {
      video: {
        facingMode: isFrontCamera ? "user" : "environment",
      },
    };
    //お試し
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop()); // ストリーム停止
  }
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video2.srcObject = stream;
    } catch (error) {
      console.error("カメラの起動に失敗しました:", error);
    }
  }
  // 撮影する関数
  function captureImage() {
    if (video2.srcObject) {
      // 画像を水平に反転する(内カメのときだけ)
      if (isFrontCamera) {
        ctx.translate(canvas2.width, 0);
        ctx.scale(-1, 1);
      }
      // ビデオのサイズに合わせてキャンバスのサイズを設定
      // ビデオの表示サイズを取得
      const videoWidth = video2.clientWidth;
      const videoHeight = video2.clientHeight;

      // Canvas のサイズをビデオの表示サイズに合わせる
      canvas2.width = videoWidth;
      canvas2.height = videoHeight;
      // キャンバスにビデオの内容を描画
      ctx.drawImage(video2, 0, 0, canvas2.width, canvas2.height);

      // ガイドフレームを描画9/14
      const guideFrame2 = document.querySelector(".guide-frame2");
      const frameX = (canvas2.width - 300) / 2;
      const frameY = (canvas2.height - 300) / 2;

      ctx.drawImage(guideFrame2, frameX, frameY, 300, 300);

      // 撮影した画像       //撮った画像 解像度をいじるならここ。
      sleeveDataUrl = canvas2.toDataURL("image/png");

      // キャプチャした画像をBlobとして取得
      canvas2.toBlob((blob) => {
        if (blob) {
          const imageObjectURL = URL.createObjectURL(blob);

          // 撮影した画像を配列に追加
          if (imageBlobs.length > 4) {
            // 4つを超えた場合は
            window.alert("エラー：撮影画像が多すぎます");
            imageBlobs = [];
            ScreenTransition(1);
          } else {
            // 3番目の位置に代入
            // const indexToInsert = 2; // 3番目:袖1
            // 3番目と4番目に同じ画像を入れる
            //imageBlobs.splice(2, 0, blob); // 3番目に挿入
            //imageBlobs.splice(3, 0, blob); // 4番目に挿入
            imageBlobs[2] = blob;
            imageBlobs[3] = blob;
          }
          console.log(imageBlobs.length);
          // 既存の<img>要素にBlobのURLを設定
          //背面撮影時なので
          const photoS = document.getElementById("photoS");
          photoS.src = imageObjectURL; // 画像のURLを設定
          photoS.alt = `IMG${imageBlobs.length}`; // 画像の識別名

          console.log("袖画像のURL:" + imageObjectURL); // BlobのURLを表示
        }
      }, "image/png");

      //袖画像
      // const photoS = document.getElementById("photoS");
      // photoS.setAttribute("src", sleeveDataUrl);
      //↓確認用コンソール
      // console.log("袖画像URL:", sleeveDataUrl);
      //確認画面へ遷移
      ScreenTransition(10);
      // console.log(screenCount);
      // showScreen(10);
    } else {
      console.error("カメラのストリームが開始されていません。");
    }
  }

  // イベントリスナーの設定
  capture2.addEventListener("click", captureImage);
  //内カメ外カメのトグル
  document.getElementById("toggle-camera2").addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();
  });

  // カメラの起動
  startCamera();
});

//袖プレビュー　scr10
//撮りなおすボタン 袖
const RetakeS = document
  .getElementById("RetakeS")
  .addEventListener("click", () => {
    //カメラ画面にもどるイベントをいれる
    ScreenTransition(9);
  });
//進むボタン　袖撮影後
const sleeveFinish = document
  .getElementById("sleeveFinish")
  .addEventListener("click", function () {
    sendImageDataToAPI();
    //最終確認画面に遷移
    ScreenTransition(11);
  });

//いるかわからない＋画面はなし
//袖の切り抜き
let imageUrl;
function Cut() {
  console.log(imageUrl);
  const img = new Image();
  img.onload = function () {
    // Canvasを設定
    const canvasinput = document.getElementById("input");
    const ctx = canvasinput.getContext("2d");
    canvasinput.width = img.width;
    canvasinput.height = img.height;
    ctx.drawImage(img, 0, 0);

    /*// 切り取りたい範囲を指定
    const cutWidth = 100; // 切り取り幅
    const cutHeight = 200; // 切り取り高さ

    // 画像の中心から切り取り範囲を計算
    const x = (img.width - cutWidth) / 2;
    const y = (img.height - cutHeight) / 2;

    // 切り取り範囲を描画するための新しいCanvas
    const outputCanvas = document.getElementById("output");
    const outputCtx = outputCanvas.getContext("2d");
    outputCanvas.width = cutWidth;
    outputCanvas.height = cutHeight;

    // 切り取り範囲を描画
    canvasinput.drawImage(
      canvasinput,
      x,
      y,
      cutWidth,
      cutHeight,
      0,
      0,
      cutWidth,
      cutHeight
    );*/


    

    // 撮影した画像       //撮った画像 解像度をいじるならここ。
    sleeveDataUrl = outputCanvas.toDataURL("image/png");

    // キャプチャした画像をBlobとして取得
    outputCanvas.toBlob((blob) => {
      if (blob) {
        const imageObjectURL = URL.createObjectURL(blob);

        // 撮影した画像を配列に追加
        if (imageBlobs.length >= 4) {
          // 4つを超えた場合は
          window.alert("エラー：撮影画像が多すぎます");
          imageBlobs = [];
          ScreenTransition(1);
        } else {
          // 3番目の位置に代入
          // const indexToInsert = 2; // 3番目:袖1
          // 3番目と4番目に同じ画像を入れる
          imageBlobs.splice(2, 0, blob); // 3番目に挿入
          imageBlobs.splice(3, 0, blob); // 4番目に挿入
        }
        console.log(imageBlobs.length);
        console.log(imageBlobs[2], imageBlobs[3]);
        
        /*/ 1番目のデータを3番目に複製
      imageBlobs.splice(2, 0, imageBlobs[0]);
      // 2番目のデータを4番目に複製
      imageBlobs.splice(3, 0, imageBlobs[1]);
      console.log(imageBlobs.length);
      sendImageDataToAPI();*/ 


        // 既存の<img>要素にBlobのURLを設定
        //袖切り抜き時なので
        const photoS = document.getElementById("photoS");
        photoS.src = imageObjectURL; // 画像のURLを設定
        photoS.alt = `IMG${imageBlobs.length}`; // 画像の識別名

        console.log("袖画像のURL:" + imageObjectURL); // BlobのURLを表示
      }
    }, "image/png");
  };
  img.src = imageUrl; // 画像URLを設定
}

//撮影終了後　scr11
const retakeAll = document
  .getElementById("retakeAll")
  .addEventListener("click", () => {
    ScreenTransition(3);
    //撮影時の注意点にもどる
  });
//ダウンロードのボタンはここ。3班からのAPI結果
const finish = document
  .getElementById("download")
  .addEventListener("click", () => {
    document.getElementById("templateValue").textContent = templateName;
    ScreenTransition(12);
  });

//最終画面　scr12

//最初からやる
const typeselectbtn = document
  .getElementById("typeselectbtn")
  .addEventListener("click", () => {
    isFrontCamera = true; //初期は内カメ

    ScreenTransition(1);
  });
//終了ボタン
function closeapp() {
  alert("アプリケーションを終了します。");

  // 必要に応じて他の終了処理を追加
  window.close(); // ブラウザタブを閉じる (条件によっては動作しないことがあります)
}

//API関連
const imageBlobs = []; // 撮影した画像データを保存する配列

// 実行ボタン＝scr11に行くときのボタン
// APIにリクエストする関数を定義
function sendImageDataToAPI() {
  const formData = new FormData();
  imageBlobs.forEach((blob, index) => {
    formData.append(`longshirt[]`, blob, `image${index}.png`);
  });

  fetch("https://sensible-trusted-hare.ngrok-free.app/process_images", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.blob();
    })
    .then((imageBlob) => {
      const imageObjectURL = URL.createObjectURL(imageBlob);
      // const imgElement = document.getElementById("resultimg");
      const imgElements = document.querySelectorAll(".result-image"); //２つ同じClass名のimg
      imgElements.forEach((imgElement) => {
        imgElement.src = imageObjectURL; // 各img要素のsrcを設定
      });

      // ダウンロードリンクを設定する
      const downloadButton = document.getElementById("download");
      downloadButton.href = imageObjectURL;

      //画像に名前をつけて、ダウンロード可能に
      downloadButton.download = "型紙img.jpeg";

      // imgElement.src = imageObjectURL;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

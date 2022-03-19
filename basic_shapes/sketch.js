// ここにスケッチ名を指定することができる。
let sketchName = '基本的な図形';

// Paper.jsの弧の書き方は少し癖がある。他のライブラリでよく、中心点、半径と開始と終了の角度で
// 描くので、ここはこの形の引数を渡して、値を変換して弧を描く。
function arcAngles(center, radius, fromRadians, toRadians) {
    const midRadians = (fromRadians + toRadians) * 0.5;
    const from = [center[0] + Math.cos(fromRadians) * radius, center[1] + Math.sin(fromRadians) * radius];
    const to = [center[0] + Math.cos(toRadians) * radius, center[1] + Math.sin(toRadians) * radius];
    const mid = [center[0] + Math.cos(midRadians) * radius, center[1] + Math.sin(midRadians) * radius];
    Path.Arc(from, mid, to);
}

// ロードが完了した時に実行する関数。ここで初期化の処理を書く。
// P5.jsやProcessingのsetupと同じ役割。
window.onload = function() {
    // キャンバスの大きさを指定する。
    view.viewSize = new Size(500, 500);

    // デフォルトのスタイルを指定することができる。
    // この形で書くことによってこれから生成する図形の最初のスタイルが決まる。
    project.currentStyle = {
        strokeColor: '#000000',
        fillColor: '#FFFFFF',
        strokeWidth: 1
    };

    // 直線 : 開始点の座標, 終了点の座標
    Path.Line([20, 20], [100, 50]);

    // 正円 : 中心点の座標, 半径
    Path.Circle([150, 30], 20);

    // 長方形 : 左上の座標, 幅と高さ
    Path.Rectangle([200, 20], [150, 20]);

    // 楕円 : 引数は長方形で注意してください。ここの長方形は描画する図形ではなく、抽象的な長方形を表す。
    Path.Ellipse(new Rectangle([20, 100],[30, 60]));

    // 弧 : 開始点の座標, 途中点の座標, 終了点の座標
    Path.Arc([100, 100], [155, 125], [150, 150]);

    // 弧の書き方は少し分かりにくいので、3つの座標を見せると：
    const from = [200, 100];
    const mid = [255, 125];
    const to = [250, 150];
    Path.Arc(from, mid, to);
    const from_circle = Path.Circle(from, 5);
    const mid_circle = Path.Circle(mid, 5);
    const to_circle = Path.Circle(to, 5);

    from_circle.fillColor = null;
    mid_circle.fillColor = null;
    to_circle.fillColor = null;

    from_circle.strokeColor = '#0F80FF';
    mid_circle.strokeColor = 'red';
    to_circle.strokeColor = '#0F80FF';

    // P5.jsなど、他のライブラリの様に、中心の座標、半径、開始と終了の角度を指定したい場合、
    // このファイルの上部に定義した関数を使うと便利。
    arcAngles([350, 125], 30, 0, Math.PI * 0.5);

    // 画面を描く。
    view.draw();

    // 多角形 : 中心の座標, 辺の数, 半径
    const regularPoly = Path.RegularPolygon([100, 250], 6, 50);

    // 星 : 中心の座標, 角の数, 内側の半径, 外側の半径
    const star = Path.Star([250, 250], 5, 25, 50);

    // 多角形や星の向きはこう変えられる。
    regularPoly.rotate(45);
    star.rotate(90);
};
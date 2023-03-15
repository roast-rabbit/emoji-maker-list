export default function (id) {
  const html = String.raw;
  return html` <div class="bg_white h-100 small border radius_1 p-3 d-flex flex-column relative">
    <div class="row no-gutters">
      <div class="col-auto mr_1">
        <canvas
          class="c"
          id="canvas${id}"
          class="radius_1_2 d-flex overflow_hidden d-block border bg_lightsilver text_blue"
          alt="Avatar"
          width="46"
          height="46"
          title="JoyPixels的图片"
        ></canvas>
      </div>
      <div class="col grow overflow_hidden">
        <p class="mb_0 truncate">
          <a
            class="strong decoration"
            href="/zh-hans/image-emoji-platform/joypixels/animation"
            title="JoyPixels的图片"
            >JoyPixels的图片</a
          >
        </p>
        <a
          class="mb_0 text_silver truncate"
          href="/zh-hans/image-emoji-platform/joypixels/animation"
          >files: <span class="text_blue">198</span></a
        >
      </div>
      <a class="" href="/zh-hans/image-emoji-platform/joypixels/animation">
        <img src="/img/logo/joypixels.png" alt="JoyPixels" width="24" height="24" />
      </a>
    </div>
    <hr class="my_1" />
    <div class="row no-gutters align-items-center">
      <p class="col grow mr_1 x_small mb_0 text_silver truncate">
        <i class="iconfont icontime-line"></i>
        更新: 2022/11/14
      </p>
    </div>
  </div>`;
}

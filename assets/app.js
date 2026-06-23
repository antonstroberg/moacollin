/* ==========================================================================
   Moa Collin — site runtime
   Shared header/footer, bilingual (SV/EN) content + language toggle.
   Each page sets <body data-page="..."> and provides <main id="app">.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Logo (inlined SVG paths from the design system Logo component) ---- */
  var MC_PATH = "M116.247 124.95L123.987 127.425V129H89.5622V127.425L97.6172 125.535L93.4772 70.77L94.2872 70.905L72.2822 129.315H62.4272L40.3772 71.265L41.1872 71.175L37.9022 125.715L45.6422 127.425V129H27.0572V127.425L34.3022 125.715L37.6772 69.825L29.5322 66.225V64.65H57.4772L75.6572 113.79L74.3522 113.745L92.7122 64.65H120.027V66.225L111.702 68.475L116.247 124.95ZM166.566 127.2C168.426 127.2 170.211 126.915 171.921 126.345C173.631 125.775 175.266 124.89 176.826 123.69L174.486 125.67L184.836 110.055H186.366L182.541 127.875C179.301 128.715 176.211 129.3 173.271 129.63C170.331 129.99 167.076 130.17 163.506 130.17C157.956 130.17 152.916 129.465 148.386 128.055C143.856 126.615 139.956 124.47 136.686 121.62C133.446 118.74 130.956 115.185 129.216 110.955C127.476 106.725 126.606 101.82 126.606 96.24C126.606 89.73 128.136 84.015 131.196 79.095C134.286 74.175 138.576 70.35 144.066 67.62C149.556 64.86 155.946 63.48 163.236 63.48C165.876 63.48 168.261 63.615 170.391 63.885C172.521 64.125 174.921 64.545 177.591 65.145L173.631 66.27L180.156 61.455H180.876L185.646 85.935L184.161 86.385L173.046 69.06L176.556 73.29C173.916 70.71 171.486 68.97 169.266 68.07C167.046 67.17 164.751 66.72 162.381 66.72C159.921 66.72 157.641 67.185 155.541 68.115C153.471 69.045 151.656 70.56 150.096 72.66C148.536 74.73 147.321 77.49 146.451 80.94C145.581 84.36 145.146 88.59 145.146 93.63C145.146 98.67 145.701 103.26 146.811 107.4C147.951 111.51 149.496 115.05 151.446 118.02C153.426 120.96 155.706 123.225 158.286 124.815C160.866 126.405 163.626 127.2 166.566 127.2Z";
  var WORD_PATH = "M329.875 119.478L338.702 121.127V122H314.792V121.127L323.619 119.478L319.06 55.555L319.739 55.652L291.027 122.97H289.863L260.908 56.1855L261.587 56.0885L257.368 119.478L266.534 121.127V122H246.455V121.127L255.282 119.478L259.647 55.749L250.675 53.5665V52.645H265.807L293.306 115.986H291.851L318.866 52.645H334.774V53.615L325.025 55.264L329.875 119.478ZM365.087 121.466C368.611 121.466 371.667 120.464 374.253 118.459C376.84 116.455 378.845 113.626 380.267 109.972C381.69 106.286 382.401 101.937 382.401 96.9255C382.401 91.9785 381.69 87.7105 380.267 84.1215C378.877 80.5325 376.888 77.768 374.302 75.828C371.715 73.8557 368.676 72.8695 365.184 72.8695C361.627 72.8695 358.555 73.8718 355.969 75.8765C353.382 77.8812 351.377 80.7265 349.955 84.4125C348.564 88.0662 347.869 92.3988 347.869 97.4105C347.869 102.357 348.564 106.625 349.955 110.214C351.377 113.803 353.382 116.584 355.969 118.556C358.555 120.496 361.595 121.466 365.087 121.466ZM364.99 122.97C360.754 122.97 356.858 121.919 353.301 119.817C349.777 117.716 346.948 114.757 344.814 110.942C342.68 107.094 341.613 102.584 341.613 97.4105C341.613 92.1402 342.664 87.5488 344.765 83.6365C346.867 79.7242 349.696 76.701 353.253 74.567C356.842 72.433 360.851 71.366 365.281 71.366C369.549 71.366 373.445 72.4168 376.969 74.5185C380.494 76.6202 383.323 79.5787 385.457 83.394C387.591 87.2093 388.658 91.7198 388.658 96.9255C388.658 102.196 387.591 106.787 385.457 110.699C383.355 114.612 380.51 117.635 376.921 119.769C373.364 121.903 369.387 122.97 364.99 122.97ZM427.268 89.8445L427.462 91.348C421.869 93.094 417.407 94.7107 414.076 96.198C410.778 97.653 408.289 99.0757 406.607 100.466C404.958 101.856 403.859 103.263 403.309 104.685C402.792 106.108 402.533 107.66 402.533 109.341C402.533 112.348 403.439 114.725 405.249 116.471C407.06 118.217 409.42 119.09 412.33 119.09C414.658 119.09 416.776 118.621 418.684 117.683C420.591 116.746 422.111 115.404 423.243 113.658C424.407 111.88 424.989 109.794 424.989 107.401V85.916C424.989 82.1653 424.116 79.2715 422.37 77.2345C420.624 75.1652 417.762 74.1305 413.785 74.1305C411.845 74.1305 409.905 74.3407 407.965 74.761C406.025 75.149 404.101 75.7633 402.194 76.604L405.152 74.8095C405.023 75.9735 404.845 77.089 404.619 78.156C404.425 79.1907 404.198 80.096 403.94 80.872C403.713 81.648 403.455 82.2138 403.164 82.5695C402.808 82.9898 402.291 83.3293 401.612 83.588C400.933 83.8143 400.254 83.9275 399.575 83.9275C398.637 83.9275 397.91 83.7497 397.392 83.394C396.907 83.006 396.665 82.4402 396.665 81.6965C396.665 80.5002 397.311 79.3038 398.605 78.1075C399.93 76.8788 401.612 75.7633 403.649 74.761C405.686 73.7587 407.82 72.9665 410.051 72.3845C412.282 71.7702 414.335 71.463 416.21 71.463C419.896 71.463 422.79 72.0288 424.892 73.1605C426.993 74.2922 428.481 75.8927 429.354 77.962C430.227 80.0313 430.663 82.4563 430.663 85.237V113.755C430.663 115.145 430.873 116.228 431.294 117.004C431.714 117.78 432.28 118.33 432.991 118.653C433.703 118.977 434.479 119.138 435.319 119.138C436.419 119.138 437.405 119.009 438.278 118.75C439.183 118.459 440.266 117.942 441.527 117.198V118.071C439.846 119.85 438.278 121.111 436.823 121.854C435.4 122.566 433.848 122.922 432.167 122.922C430.388 122.922 428.933 122.55 427.802 121.806C426.702 121.03 425.926 119.72 425.474 117.877C425.021 116.034 424.843 113.512 424.94 110.311L425.231 110.166C424.649 112.914 423.647 115.242 422.224 117.15C420.802 119.058 419.072 120.513 417.035 121.515C415.03 122.485 412.864 122.97 410.536 122.97C406.3 122.97 402.905 121.887 400.351 119.72C397.829 117.522 396.568 114.369 396.568 110.263C396.568 108.226 396.907 106.415 397.586 104.831C398.265 103.214 399.639 101.678 401.709 100.223C403.778 98.7362 406.85 97.168 410.924 95.519C414.998 93.87 420.446 91.9785 427.268 89.8445ZM507.094 120.884C509.422 120.884 511.734 120.448 514.03 119.575C516.358 118.67 518.653 117.215 520.917 115.21L518.831 117.392L528.143 102.6H529.501L525.621 120.4C522.129 121.467 518.896 122.178 515.921 122.534C512.946 122.889 509.697 123.067 506.173 123.067C500.644 123.067 495.519 122.307 490.798 120.787C486.11 119.268 482.02 116.988 478.528 113.949C475.036 110.877 472.32 107.078 470.379 102.551C468.44 97.9925 467.47 92.6898 467.47 86.6435C467.47 79.6918 469.054 73.597 472.223 68.359C475.391 63.0887 479.772 58.9823 485.366 56.04C490.992 53.0653 497.491 51.578 504.863 51.578C507.611 51.578 510.198 51.7397 512.623 52.063C515.08 52.354 517.683 52.8228 520.432 53.4695L517.328 54.2455L523.196 49.7835H523.875L528.483 74.3245L527.173 74.567L516.939 57.5435L519.413 60.405C516.503 58.1417 513.739 56.5412 511.12 55.6035C508.533 54.6658 505.849 54.197 503.069 54.197C500.094 54.197 497.265 54.7305 494.581 55.7975C491.93 56.8645 489.569 58.5943 487.5 60.987C485.463 63.3473 483.846 66.516 482.65 70.493C481.486 74.4377 480.904 79.32 480.904 85.14C480.904 91.1217 481.599 96.3435 482.99 100.805C484.38 105.267 486.288 108.986 488.713 111.96C491.138 114.935 493.918 117.166 497.055 118.653C500.223 120.141 503.57 120.884 507.094 120.884ZM560.477 120.593C563.258 120.593 565.57 119.753 567.413 118.071C569.288 116.39 570.679 113.852 571.584 110.457C572.522 107.03 572.99 102.745 572.99 97.6045C572.99 92.3665 572.538 87.9853 571.632 84.461C570.759 80.9043 569.401 78.2368 567.558 76.4585C565.748 74.6478 563.436 73.7425 560.623 73.7425C557.842 73.7425 555.514 74.5993 553.639 76.313C551.796 77.9943 550.406 80.5325 549.468 83.9275C548.563 87.3225 548.11 91.5905 548.11 96.7315C548.11 101.969 548.563 106.367 549.468 109.923C550.373 113.448 551.731 116.115 553.542 117.926C555.385 119.704 557.697 120.593 560.477 120.593ZM560.235 123.067C555.644 123.067 551.505 121.968 547.819 119.769C544.133 117.57 541.223 114.531 539.089 110.651C536.955 106.739 535.888 102.244 535.888 97.168C535.888 92.0917 536.987 87.6135 539.186 83.7335C541.417 79.8212 544.424 76.7657 548.207 74.567C551.99 72.3683 556.226 71.269 560.914 71.269C565.602 71.269 569.773 72.3683 573.427 74.567C577.081 76.7657 579.958 79.805 582.06 83.685C584.194 87.565 585.261 92.0593 585.261 97.168C585.261 102.244 584.129 106.739 581.866 110.651C579.603 114.531 576.579 117.57 572.796 119.769C569.013 121.968 564.826 123.067 560.235 123.067ZM607.976 119.138L614.378 120.642V122H590.225V120.642L596.578 119.138V59.629C596.158 59.4027 595.56 59.0793 594.784 58.659C594.04 58.2387 593.151 57.7375 592.116 57.1555C591.081 56.5412 589.934 55.8783 588.673 55.167V54.1485L607.539 49.929H607.976V58.8045V119.138ZM635.541 119.138L641.943 120.642V122H617.79V120.642L624.143 119.138V59.629C623.723 59.4027 623.125 59.0793 622.349 58.659C621.605 58.2387 620.716 57.7375 619.681 57.1555C618.647 56.5412 617.499 55.8783 616.238 55.167V54.1485L635.104 49.929H635.541V58.8045V119.138ZM657.432 64.479C655.201 64.479 653.439 63.7515 652.145 62.2965C650.884 60.8092 650.254 59.1278 650.254 57.2525C650.254 55.4095 650.884 53.8252 652.145 52.4995C653.439 51.1415 655.201 50.4625 657.432 50.4625C659.663 50.4625 661.377 51.1415 662.573 52.4995C663.802 53.8252 664.416 55.4095 664.416 57.2525C664.416 59.1278 663.802 60.8092 662.573 62.2965C661.377 63.7515 659.663 64.479 657.432 64.479ZM663.834 70.8325V80.5325V119.138L670.09 120.642V122H646.034V120.642L652.436 119.138V81.648C652.081 81.357 651.563 80.969 650.884 80.484C650.238 79.999 649.478 79.4493 648.605 78.835C647.732 78.1883 646.794 77.4932 645.792 76.7495V75.731L663.397 70.8325H663.834ZM691.822 81.0175V119.138L698.127 120.642V122H674.071V120.642L680.425 119.138V81.648C679.907 81.2277 679.164 80.6457 678.194 79.902C677.224 79.1583 675.769 78.1075 673.829 76.7495V75.731L691.434 70.8325H691.822V81.0175ZM705.693 120.642L711.998 119.138V88.438C711.998 86.401 711.659 84.7197 710.98 83.394C710.301 82.0683 709.25 81.0822 707.827 80.4355C706.437 79.7565 704.626 79.417 702.395 79.417C700.164 79.417 697.998 79.7242 695.896 80.3385C693.827 80.9528 692.016 81.6318 690.464 82.3755L689.979 81.4055C692.501 79.2715 694.667 77.5417 696.478 76.216C698.321 74.8903 699.97 73.888 701.425 73.209C702.88 72.4977 704.27 72.0127 705.596 71.754C706.922 71.4953 708.361 71.366 709.913 71.366C714.601 71.366 718.012 72.627 720.146 75.149C722.312 77.671 723.396 81.5672 723.396 86.8375V119.138L729.798 120.642V122H705.693V120.642Z";
  var TAG_PATH = "M248.16 180V152.12H256.48C258.613 152.12 260.36 152.44 261.72 153.08C263.08 153.693 264.093 154.587 264.76 155.76C265.427 156.933 265.76 158.333 265.76 159.96C265.76 162.28 265.093 164.12 263.76 165.48C262.427 166.813 260.493 167.6 257.96 167.84C257.56 167.867 257.08 167.88 256.52 167.88C255.96 167.88 255.413 167.88 254.88 167.88H251.68V180H248.16ZM263.76 180L256.52 167.44L260.12 167L267.8 180H263.76ZM251.68 164.76H256.12C257.347 164.76 258.413 164.6 259.32 164.28C260.227 163.96 260.933 163.453 261.44 162.76C261.973 162.067 262.24 161.147 262.24 160C262.24 158.827 261.973 157.907 261.44 157.24C260.933 156.547 260.213 156.053 259.28 155.76C258.373 155.44 257.32 155.28 256.12 155.28H251.68V164.76ZM271.832 180V152.12H290.192V155.28H275.352V164.2H288.832V167.36H275.352V176.84H290.192V180H271.832ZM295.23 180V152.12H298.75V176.84H311.23V180H295.23ZM312.555 180L323.195 152.12H325.995L336.635 180H332.795L324.635 157.16L316.435 180H312.555ZM318.475 173.44L319.555 170.28H329.635L330.795 173.44H318.475ZM343.515 180V155.28H334.155V152.12H356.395V155.28H347.075V180H343.515ZM360.191 180V152.12H363.711V180H360.191ZM381.755 180.48C379.195 180.48 376.942 179.88 374.995 178.68C373.075 177.48 371.568 175.8 370.475 173.64C369.408 171.48 368.875 168.96 368.875 166.08C368.875 163.173 369.408 160.64 370.475 158.48C371.568 156.32 373.075 154.64 374.995 153.44C376.942 152.24 379.195 151.64 381.755 151.64C384.368 151.64 386.648 152.24 388.595 153.44C390.542 154.64 392.048 156.32 393.115 158.48C394.208 160.64 394.755 163.173 394.755 166.08C394.755 168.96 394.208 171.48 393.115 173.64C392.022 175.8 390.502 177.48 388.555 178.68C386.608 179.88 384.342 180.48 381.755 180.48ZM381.755 177.12C383.702 177.12 385.368 176.667 386.755 175.76C388.168 174.853 389.262 173.573 390.035 171.92C390.808 170.267 391.195 168.32 391.195 166.08C391.195 163.813 390.808 161.853 390.035 160.2C389.262 158.547 388.168 157.267 386.755 156.36C385.368 155.453 383.702 155 381.755 155C379.862 155 378.208 155.453 376.795 156.36C375.382 157.24 374.288 158.507 373.515 160.16C372.768 161.813 372.395 163.787 372.395 166.08C372.395 168.347 372.768 170.307 373.515 171.96C374.288 173.613 375.382 174.893 376.795 175.8C378.208 176.68 379.862 177.12 381.755 177.12ZM399.957 180V152.12H403.677L417.957 175.44H417.157V152.12H420.677V180H416.877L402.677 156.64H403.477V180H399.957ZM426.988 180V152.12H445.348V155.28H430.508V164.2H443.988V167.36H430.508V176.84H445.348V180H426.988ZM450.387 180V152.12H453.907V176.84H466.387V180H450.387ZM470.191 180V152.12H473.711V176.84H486.191V180H470.191ZM492.03 180V155.28H482.67V152.12H504.91V155.28H495.59V180H492.03ZM519.098 180V152.12H522.618V176.84H535.098V180H519.098ZM538.902 180V152.12H557.262V155.28H542.422V164.2H555.902V167.36H542.422V176.84H557.262V180H538.902ZM562.301 180V152.12H570.021C574.581 152.12 578.114 153.36 580.621 155.84C583.127 158.293 584.381 161.773 584.381 166.28C584.381 170.707 583.141 174.107 580.661 176.48C578.181 178.827 574.621 180 569.981 180H562.301ZM565.821 176.76H569.661C572.034 176.76 574.047 176.413 575.701 175.72C577.381 175 578.647 173.867 579.501 172.32C580.381 170.747 580.821 168.693 580.821 166.16C580.821 163.627 580.381 161.573 579.501 160C578.647 158.4 577.407 157.227 575.781 156.48C574.181 155.733 572.247 155.36 569.981 155.36H565.821V176.76ZM585.836 180L596.476 152.12H599.276L609.916 180H606.076L597.916 157.16L589.716 180H585.836ZM591.756 173.44L592.836 170.28H602.916L604.076 173.44H591.756ZM613.785 180V152.12H622.105C624.238 152.12 625.985 152.44 627.345 153.08C628.705 153.693 629.718 154.587 630.385 155.76C631.052 156.933 631.385 158.333 631.385 159.96C631.385 162.28 630.718 164.12 629.385 165.48C628.052 166.813 626.118 167.6 623.585 167.84C623.185 167.867 622.705 167.88 622.145 167.88C621.585 167.88 621.038 167.88 620.505 167.88H617.305V180H613.785ZM629.385 180L622.145 167.44L625.745 167L633.425 180H629.385ZM617.305 164.76H621.745C622.972 164.76 624.038 164.6 624.945 164.28C625.852 163.96 626.558 163.453 627.065 162.76C627.598 162.067 627.865 161.147 627.865 160C627.865 158.827 627.598 157.907 627.065 157.24C626.558 156.547 625.838 156.053 624.905 155.76C623.998 155.44 622.945 155.28 621.745 155.28H617.305V164.76ZM645.625 180.44C642.825 180.44 640.532 179.707 638.745 178.24C636.959 176.773 635.865 174.827 635.465 172.4L638.905 171.56C639.199 173.427 639.959 174.853 641.185 175.84C642.439 176.8 643.959 177.28 645.745 177.28C646.785 177.28 647.719 177.08 648.545 176.68C649.372 176.28 650.025 175.72 650.505 175C650.985 174.253 651.225 173.413 651.225 172.48C651.225 171.493 650.959 170.68 650.425 170.04C649.892 169.4 649.145 168.84 648.185 168.36C647.252 167.88 646.159 167.4 644.905 166.92C643.359 166.333 641.999 165.693 640.825 165C639.679 164.307 638.785 163.48 638.145 162.52C637.505 161.533 637.185 160.333 637.185 158.92C637.185 157.507 637.532 156.253 638.225 155.16C638.919 154.067 639.892 153.213 641.145 152.6C642.399 151.96 643.852 151.64 645.505 151.64C647.265 151.64 648.825 152.04 650.185 152.84C651.545 153.64 652.639 154.827 653.465 156.4L650.665 158.12C650.052 157.027 649.305 156.2 648.425 155.64C647.545 155.053 646.532 154.76 645.385 154.76C644.479 154.76 643.665 154.933 642.945 155.28C642.252 155.627 641.705 156.107 641.305 156.72C640.905 157.333 640.705 158.04 640.705 158.84C640.705 159.693 640.945 160.427 641.425 161.04C641.905 161.627 642.599 162.147 643.505 162.6C644.412 163.053 645.505 163.52 646.785 164C648.412 164.613 649.812 165.28 650.985 166C652.159 166.72 653.065 167.587 653.705 168.6C654.372 169.587 654.705 170.813 654.705 172.28C654.705 173.853 654.319 175.253 653.545 176.48C652.772 177.707 651.705 178.68 650.345 179.4C648.985 180.093 647.412 180.44 645.625 180.44ZM662.443 171.12V166.64L676.323 152.12H681.043L662.443 171.12ZM659.683 180V152.12H663.203V180H659.683ZM677.003 180L667.523 165L670.163 162.56L681.123 180H677.003ZM682.555 180L693.195 152.12H695.995L706.635 180H702.795L694.635 157.16L686.435 180H682.555ZM688.475 173.44L689.555 170.28H699.635L700.795 173.44H688.475ZM710.504 180V152.12H718.824C721.837 152.12 724.13 152.787 725.704 154.12C727.304 155.453 728.104 157.413 728.104 160C728.104 162.587 727.304 164.573 725.704 165.96C724.104 167.32 721.81 168 718.824 168H713.984V180H710.504ZM713.984 164.88H718.464C720.384 164.88 721.877 164.493 722.944 163.72C724.037 162.92 724.584 161.693 724.584 160.04C724.584 158.413 724.05 157.213 722.984 156.44C721.944 155.667 720.437 155.28 718.464 155.28H713.984V164.88Z";

  function logo(tone, size) {
    var onDark = tone === 'paper';
    var tile = onDark ? 'var(--paper)' : 'var(--pine)';
    var mc = onDark ? 'var(--pine)' : 'var(--paper)';
    var text = onDark ? 'var(--paper)' : 'var(--ink)';
    var tag = onDark ? 'var(--paper)' : 'var(--ink-3)';
    var h = { sm: 28, md: 40, lg: 56, xl: 80 }[size] || 40;
    var tagOpacity = onDark ? 0.72 : 1;
    return '<svg height="' + h + '" viewBox="0 0 793 215" role="img" aria-label="Moa Collin — Relationellt ledarskap" style="display:block;width:auto">' +
      '<rect width="215" height="215" rx="40" fill="' + tile + '"></rect>' +
      '<path d="' + MC_PATH + '" fill="' + mc + '"></path>' +
      '<path d="' + WORD_PATH + '" fill="' + text + '"></path>' +
      '<path d="' + TAG_PATH + '" fill="' + tag + '" fill-opacity="' + tagOpacity + '"></path>' +
      '</svg>';
  }

  /* ---- Helpers ---- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var EMAIL = 'info@moacollin.com';

  /* ---- Routes (clean, shareable URLs; served by Cloudflare Pages) ---- */
  var ROUTES = { home: '/', experience: '/erfarenhet', karriar: '/karriar', kompetens: '/kompetens' };
  // Which top nav item is highlighted on each page (homepage anchors aren't).
  var PAGE_ACTIVE_NAV = { home: null, experience: 'erfarenhet', karriar: 'erfarenhet', kompetens: 'erfarenhet' };
  var bookingSent = false; // preserved across re-renders (e.g. language toggle)

  /* ==========================================================================
     Content — Swedish (default) and English
     ========================================================================== */
  var I18N = {
    sv: {
      htmlLang: 'sv',
      nav: [
        { key: 'forelasningar', label: 'Föreläsningar', href: '/#forelasningar' },
        { key: 'erfarenhet', label: 'Erfarenhet', href: '/erfarenhet' },
        { key: 'bok', label: 'Boken', href: '/#bok' },
        { key: 'boka', label: 'Kontakt', href: '/#boka' }
      ],
      bookBtn: 'Boka föreläsning',
      readMore: 'Läs mer',

      pageEyebrow: 'Erfarenhet',
      pageTitle: 'Tjugofem år i de svåraste klassrummen',
      pageLead: 'Jag är lärare i grunden och specialpedagog sedan 2011. Min erfarenhet kommer från åren där det är som svårast — i resursskolan och i de mest utmanande elevgrupperna. Det är där jag lärt mig att en god relation är början till varje lösning.',
      stats: [
        { figure: '25+', label: 'år i skolan' },
        { figure: '100-tals', label: 'föreläsningar', divider: true },
        { figure: '2016', label: 'eget företag', divider: true }
      ],
      hubLabel: 'Utforska',
      hub: [
        { href: '/karriar', title: 'Vägen hit', desc: 'En karriär byggd på relationer — från lärarexamen till resursskola och eget företag.', tone: 'brand' },
        { href: '/kompetens', title: 'Kompetensområden', desc: 'Relationellt ledarskap, elevhälsa, studiero och föräldracoaching.', tone: 'warm' },
        { href: '/#boka', title: 'Boka & kontakt', desc: 'Berätta om ert tillfälle så återkommer jag inom 24 timmar.', tone: 'amber' }
      ],

      timelineEyebrow: 'Vägen hit',
      timelineTitle: 'En karriär byggd på relationer',
      timelineLead: 'Steg för steg, från klassrummet till föreläsningsscenen — med relationen som röd tråd.',
      timeline: [
        { year: '1999', title: 'Lärarexamen', desc: 'Tog min lärarexamen och började undervisa. Tidigt blev det tydligt att lärandet börjar i relationen mellan lärare och elev.' },
        { year: '2011', title: 'Specialpedagogexamen', desc: 'Fördjupade mig mot elevhälsa och särskilt stöd. Förflyttade fokus från elevens "brister" till lärmiljön runt eleven.' },
        { year: '2011–2016', title: 'Resursskola', desc: 'Arbetade med särskilt utmanande elever och elevgrupper i resursskola — de barn som andra gett upp om. Här formades mitt relationella förhållningssätt.' },
        { year: '2016', title: 'Eget företag', desc: 'Startade eget som konsult inom specialpedagogik och elevhälsa. Började föreläsa, handleda och göra interventioner i stökiga klasser.' },
        { year: 'Idag', title: 'Föreläsare, handledare & författare', desc: 'Föreläser nationellt för skolor och föräldrar, handleder arbetslag, coachar föräldrar och skriver om relationellt ledarskap.' }
      ],

      expertiseEyebrow: 'Kompetensområden',
      expertiseTitle: 'Det här hjälper jag med',
      expertiseLead: 'Konkreta verktyg och förhållningssätt som fungerar i vardagen — i klassrummet och hemma.',
      expertise: [
        { tone: 'brand', title: 'Relationellt ledarskap', desc: 'Att leda utmanande grupper genom relation snarare än kontroll och tillsägelser.' },
        { tone: 'warm', title: 'Elevhälsa & specialpedagogik', desc: 'Förebyggande och främjande arbete kring elever i behov av särskilt stöd.' },
        { tone: 'amber', title: 'Utmanande klassrumsklimat', desc: 'Konkreta verktyg för studiero — check in, check out och tydliga rutiner.' },
        { tone: 'brand', title: 'Föräldracoaching', desc: 'Stöd och samtal för dig som är förälder till en ung människa, 12–16 år.' }
      ],

      clientsLabel: 'Anlitad av skolor, kommuner & konferenser',
      clients: ['Grundskolor', 'Gymnasium', 'Kommuner', 'Elevhälsoteam', 'REFIS'],

      ctaTitle: 'Vill du veta mer om hur jag kan hjälpa er?',
      ctaBody: 'Berätta kort om ert tillfälle så återkommer jag inom 24 timmar.',
      ctaBtn: 'Boka ett samtal',
      contactEyebrow: 'Kontakt',
      contactEmailLabel: 'Mejla mig direkt',

      footTag: 'Relationellt ledarskap för skolor, unga och föräldrar.',
      footContact: 'Kontakt',
      rights: '© 2026 Moa Collin. Alla rättigheter förbehållna.',

      home: {
        heroEyebrow: 'Föreläsare · Coach · Författare',
        heroA: 'Från stök', heroB: 'till ', heroItalic: 'studiero',
        heroLead: 'Jag hjälper skolor, unga och föräldrar att bygga relationer som skapar lugn, motivation och lust att lära.',
        heroPrimary: 'Boka föreläsning', heroSecondary: 'Köp boken',
        creds: [
          { year: '1999', label: 'Lärarexamen' },
          { year: '2011', label: 'Specialpedagog', divider: true },
          { year: '2016', label: 'Eget företag', divider: true }
        ],
        aboutEyebrow: 'Om Moa',
        aboutTitle: 'Tjugofem år i de svåraste klassrummen',
        aboutBody: [
          'Jag är lärare i grunden, specialpedagog sedan 2011, och har arbetat länge med särskilt utmanande elever och elevgrupper — bland annat på resursskola.',
          'Sedan 2016 driver jag eget och föreläser, handleder och gör interventioner i stökiga klasser. Min övertygelse är enkel: en god relation är början till varje lösning.'
        ],
        offerEyebrow: 'Vad jag erbjuder',
        offerTitle: 'Tre sätt att arbeta tillsammans',
        cards: [
          { badge: 'Skola', tone: 'brand', title: 'Föreläsning för skolor', desc: 'Relationellt ledarskap i utmanande grupper — konkreta verktyg för pedagoger och elevhälsa.', cta: 'Läs mer', href: '#forelasningar' },
          { badge: 'Föräldrar', tone: 'warm', title: 'Coaching för föräldrar', desc: 'Personlig coaching och föreläsningar för dig som är förälder till en ung människa.', cta: 'Läs mer', href: '#boka' },
          { badge: 'Bok', tone: 'amber', title: 'Boken', desc: 'Från stök till studiero — min handbok om relationellt förhållningssätt.', cta: 'Köp boken', href: '#bok' }
        ],
        quote: 'God relation är början till varje lösning.',
        quoteWho: 'Moa Collin',
        bookEyebrow: 'Boken', bookKicker: 'Handbok',
        bookTitle: 'Från stök till studiero',
        bookBody: 'En praktisk handbok om relationellt ledarskap i klassrummet — för lärare, elevhälsa och föräldrar. Verktyg du kan använda redan imorgon.',
        bookBullets: ['Check in & check out', 'Konkreta klassrumsverktyg', 'Relationellt förhållningssätt'],
        bookPrice: '249 kr', bookCta: 'Köp boken',
        bookCoverA: 'Från stök', bookCoverB: 'till studiero', bookCoverWho: 'Moa Collin',
        bookingEyebrow: 'Boka', bookingTitle: 'Boka Moa som talare',
        bookingBody: 'Berätta kort om ert tillfälle så återkommer jag inom 24 timmar.',
        types: ['Föreläsning – skola', 'Föreläsning – föräldrar', 'Personlig coaching', 'Handledning'],
        form: { name: 'Namn', email: 'E-post', org: 'Organisation', type: 'Typ av uppdrag', typePlaceholder: 'Välj…', msg: 'Meddelande', msgPlaceholder: 'Berätta om ert tillfälle…', submit: 'Skicka förfrågan', sending: 'Skickar…', sent: 'Tack! Jag återkommer inom 24h.', sentNote: 'Din förfrågan är skickad.', error: 'Något gick fel — mejla mig gärna direkt:' }
      }
    },

    en: {
      htmlLang: 'en',
      nav: [
        { key: 'forelasningar', label: 'Talks', href: '/#forelasningar' },
        { key: 'erfarenhet', label: 'Experience', href: '/erfarenhet' },
        { key: 'bok', label: 'The book', href: '/#bok' },
        { key: 'boka', label: 'Contact', href: '/#boka' }
      ],
      bookBtn: 'Book a talk',
      readMore: 'Read more',

      pageEyebrow: 'Experience',
      pageTitle: 'Twenty-five years in the toughest classrooms',
      pageLead: 'I trained as a teacher and have been a qualified special educator since 2011. My experience comes from where it is hardest — in resource schools and the most challenging student groups. That is where I learned that a good relationship is the beginning of every solution.',
      stats: [
        { figure: '25+', label: 'years in schools' },
        { figure: '100s', label: 'of talks', divider: true },
        { figure: '2016', label: 'own practice', divider: true }
      ],
      hubLabel: 'Explore',
      hub: [
        { href: '/karriar', title: 'The path here', desc: 'A career built on relationships — from teaching degree to resource school and my own practice.', tone: 'brand' },
        { href: '/kompetens', title: 'Areas of expertise', desc: 'Relational leadership, student health, classroom calm and parent coaching.', tone: 'warm' },
        { href: '/#boka', title: 'Book & contact', desc: 'Tell me about your event and I’ll get back to you within 24 hours.', tone: 'amber' }
      ],

      timelineEyebrow: 'The path here',
      timelineTitle: 'A career built on relationships',
      timelineLead: 'Step by step, from the classroom to the stage — with relationship as the common thread.',
      timeline: [
        { year: '1999', title: 'Teaching degree', desc: 'Qualified as a teacher and began teaching. It quickly became clear that learning starts in the relationship between teacher and student.' },
        { year: '2011', title: 'Special-education degree', desc: 'Specialised in student health and additional support — shifting focus from the student’s "deficits" to the learning environment around them.' },
        { year: '2011–2016', title: 'Resource school', desc: 'Worked with the most challenging students and groups in a resource school — the children others had given up on. This is where my relational approach took shape.' },
        { year: '2016', title: 'Own practice', desc: 'Started my own practice as a consultant in special education and student health: speaking, mentoring and running interventions in disruptive classes.' },
        { year: 'Today', title: 'Speaker, mentor & author', desc: 'I speak nationally for schools and parents, mentor teaching teams, coach parents, and write about relational leadership.' }
      ],

      expertiseEyebrow: 'Areas of expertise',
      expertiseTitle: 'How I can help',
      expertiseLead: 'Concrete tools and approaches that work day to day — in the classroom and at home.',
      expertise: [
        { tone: 'brand', title: 'Relational leadership', desc: 'Leading challenging groups through relationship rather than control and reprimands.' },
        { tone: 'warm', title: 'Student health & special ed', desc: 'Preventive, strengths-based work around students who need additional support.' },
        { tone: 'amber', title: 'Challenging classroom climate', desc: 'Concrete tools for calm and focus — check in, check out and clear routines.' },
        { tone: 'brand', title: 'Parent coaching', desc: 'Support and conversation for parents of a young person aged 12–16.' }
      ],

      clientsLabel: 'Engaged by schools, municipalities & conferences',
      clients: ['Primary schools', 'Upper secondary', 'Municipalities', 'Student-health teams', 'REFIS'],

      ctaTitle: 'Want to know how I can help you?',
      ctaBody: 'Tell me a little about your event and I’ll get back to you within 24 hours.',
      ctaBtn: 'Book a conversation',
      contactEyebrow: 'Contact',
      contactEmailLabel: 'Email me directly',

      footTag: 'Relational leadership for schools, young people and parents.',
      footContact: 'Contact',
      rights: '© 2026 Moa Collin. All rights reserved.',

      home: {
        heroEyebrow: 'Speaker · Coach · Author',
        heroA: 'From chaos', heroB: 'to ', heroItalic: 'calm',
        heroLead: 'I help schools, young people and parents build the relationships that create calm, motivation and a genuine desire to learn.',
        heroPrimary: 'Book a talk', heroSecondary: 'Buy the book',
        creds: [
          { year: '1999', label: 'Teaching degree' },
          { year: '2011', label: 'Special-ed degree', divider: true },
          { year: '2016', label: 'Own practice', divider: true }
        ],
        aboutEyebrow: 'About Moa',
        aboutTitle: 'Twenty-five years in the toughest classrooms',
        aboutBody: [
          'I trained as a teacher, qualified as a special educator in 2011, and have spent years working with the most challenging students and groups — including at a resource school.',
          'Since 2016 I have run my own practice: speaking, mentoring and running interventions in disruptive classes. My conviction is simple: a good relationship is the beginning of every solution.'
        ],
        offerEyebrow: 'What I offer',
        offerTitle: 'Three ways to work together',
        cards: [
          { badge: 'Schools', tone: 'brand', title: 'Talks for schools', desc: 'Relational leadership in challenging groups — concrete tools for teachers and student health teams.', cta: 'Learn more', href: '#forelasningar' },
          { badge: 'Parents', tone: 'warm', title: 'Coaching for parents', desc: 'Personal coaching and talks for parents of a young person aged 12–16.', cta: 'Learn more', href: '#boka' },
          { badge: 'Book', tone: 'amber', title: 'The book', desc: 'From chaos to calm — my handbook on the relational approach.', cta: 'Buy the book', href: '#bok' }
        ],
        quote: 'A good relationship is the beginning of every solution.',
        quoteWho: 'Moa Collin',
        bookEyebrow: 'The book', bookKicker: 'Handbook',
        bookTitle: 'From chaos to calm',
        bookBody: 'A practical handbook on relational leadership in the classroom — for teachers, student-health teams and parents. Tools you can use tomorrow.',
        bookBullets: ['Check in & check out', 'Concrete classroom tools', 'The relational approach'],
        bookPrice: '€24', bookCta: 'Buy the book',
        bookCoverA: 'From chaos', bookCoverB: 'to calm', bookCoverWho: 'Moa Collin',
        bookingEyebrow: 'Booking', bookingTitle: 'Book Moa as a speaker',
        bookingBody: 'Tell me a little about your event and I’ll get back to you within 24 hours.',
        types: ['Talk – school', 'Talk – parents', 'Personal coaching', 'Mentoring'],
        form: { name: 'Name', email: 'Email', org: 'Organisation', type: 'Type of engagement', typePlaceholder: 'Choose…', msg: 'Message', msgPlaceholder: 'Tell me about your event…', submit: 'Send request', sending: 'Sending…', sent: 'Thank you! I’ll reply within 24h.', sentNote: 'Your request has been sent.', error: 'Something went wrong — please email me directly:' }
      }
    }
  };

  /* ==========================================================================
     Renderers
     ========================================================================== */
  function navHTML(t, activeKey) {
    return t.nav.map(function (n) {
      var cur = n.key === activeKey ? ' aria-current="page"' : '';
      return '<a href="' + n.href + '"' + cur + '>' + esc(n.label) + '</a>';
    }).join('');
  }

  function badge(label, tone) {
    return '<span class="badge ' + (tone || 'brand') + '">' + esc(label) + '</span>';
  }

  var ICON_MENU = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  var ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function langToggleHTML(tone) {
    return '<div class="lang-toggle' + (tone === 'paper' ? ' paper' : '') + '" role="group" aria-label="Language">' +
      '<button type="button" data-lang="sv" aria-pressed="' + (LANG === 'sv') + '">SV</button>' +
      '<button type="button" data-lang="en" aria-pressed="' + (LANG === 'en') + '">EN</button>' +
    '</div>';
  }

  function headerHTML(t, activeKey) {
    return '<div class="bar">' +
      '<a class="brand" href="/" aria-label="Moa Collin">' + logo('ink', 'md') + '</a>' +
      '<nav class="site-nav" aria-label="Huvudmeny">' + navHTML(t, activeKey) + '</nav>' +
      '<div class="header-actions">' +
        langToggleHTML('ink') +
        '<a class="btn btn-primary sm booknav" href="' + '/#boka' + '">' + esc(t.bookBtn) + '</a>' +
        '<button type="button" class="menu-toggle" aria-label="' + (LANG === 'sv' ? 'Öppna meny' : 'Open menu') + '" aria-expanded="false" aria-controls="site-drawer">' + ICON_MENU + '</button>' +
      '</div>' +
    '</div>';
  }

  // The drawer is rendered into a body-level root (not the header) so its
  // position:fixed layout isn't trapped by the header's backdrop-filter, which
  // would otherwise clamp the overlay/drawer to the header's box.
  function drawerHTML(t, activeKey) {
    return '<div class="drawer-overlay" data-drawer-close></div>' +
    '<aside class="drawer" id="site-drawer" aria-label="Meny" aria-hidden="true">' +
      '<div class="drawer-top">' +
        '<a class="brand" href="/" aria-label="Moa Collin">' + logo('ink', 'md') + '</a>' +
        '<button type="button" class="drawer-close" data-drawer-close aria-label="' + (LANG === 'sv' ? 'Stäng meny' : 'Close menu') + '">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<nav class="drawer-nav" aria-label="Mobilmeny">' + navHTML(t, activeKey) + '</nav>' +
      '<div class="drawer-foot">' +
        langToggleHTML('ink') +
        '<a class="btn btn-primary" href="' + '/#boka' + '">' + esc(t.bookBtn) + '</a>' +
      '</div>' +
    '</aside>';
  }

  function footerHTML(t) {
    return '<div class="inner">' +
      '<div class="top">' +
        '<div class="about">' +
          '<a class="brand" href="/" aria-label="Moa Collin">' + logo('paper', 'md') + '</a>' +
          '<p>' + esc(t.footTag) + '</p>' +
        '</div>' +
        '<nav class="links" aria-label="Sidfot">' +
          t.nav.map(function (n) { return '<a href="' + n.href + '">' + esc(n.label) + '</a>'; }).join('') +
        '</nav>' +
        '<div class="contact">' +
          '<p class="label">' + esc(t.footContact) + '</p>' +
          '<a class="email" href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
          '<a class="linkedin" href="https://www.linkedin.com/in/moa-collin-28b654109/" target="_blank" rel="noopener">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z"></path></svg> LinkedIn' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<p class="rights">' + esc(t.rights) + '</p>' +
    '</div>';
  }

  function statbandHTML(t) {
    var items = t.stats.map(function (s) {
      return '<div class="stat">' +
        (s.divider ? '<span class="divider"></span>' : '') +
        '<div class="body"><span class="figure">' + esc(s.figure) + '</span>' +
        '<span class="label">' + esc(s.label) + '</span></div></div>';
    }).join('');
    return '<div class="statband"><div class="inner">' + items + '</div></div>';
  }

  function clientsHTML(t) {
    return '<section class="section"><div class="inner-lg clients">' +
      '<p class="label">' + esc(t.clientsLabel) + '</p>' +
      '<div class="row">' + t.clients.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' +
    '</div></section>';
  }

  function ctaHTML(t) {
    return '<section class="cta"><div class="inner">' +
      '<h2>' + esc(t.ctaTitle) + '</h2>' +
      '<p>' + esc(t.ctaBody) + '</p>' +
      '<a class="btn btn-accent lg" href="' + '/#boka' + '">' + esc(t.ctaBtn) + '</a>' +
    '</div></section>';
  }

  function eyebrow(text, cls) { return '<span class="eyebrow ' + (cls || '') + '">' + esc(text) + '</span>'; }

  /* ---- Page bodies ---- */
  var PAGES = {
    experience: function (t) {
      var hub = t.hub.map(function (h) {
        return '<a class="card link" href="' + h.href + '">' +
          '<span class="accent-edge ' + h.tone + '"></span>' +
          '<h3>' + esc(h.title) + '</h3><p>' + esc(h.desc) + '</p>' +
          '<span class="more">' + esc(t.readMore) + ' →</span>' +
        '</a>';
      }).join('');
      return '<section class="hero"><div class="inner">' +
          eyebrow(t.pageEyebrow) +
          '<h1>' + esc(t.pageTitle) + '</h1>' +
          '<p class="lead">' + esc(t.pageLead) + '</p>' +
        '</div></section>' +
        statbandHTML(t) +
        '<section class="section alt"><div class="inner-xl">' +
          '<div class="section-head center big">' + eyebrow(t.hubLabel) + '</div>' +
          '<div class="hub">' + hub + '</div>' +
        '</div></section>' +
        clientsHTML(t) +
        ctaHTML(t);
    },

    karriar: function (t) {
      var rows = t.timeline.map(function (e) {
        return '<div class="tl-row"><div class="tl-year">' + esc(e.year) + '</div>' +
          '<div class="tl-body"><span class="tl-dot"></span>' +
          '<h3>' + esc(e.title) + '</h3><p>' + esc(e.desc) + '</p></div></div>';
      }).join('');
      return '<section class="section"><div class="inner-md">' +
          '<div class="section-head">' + eyebrow(t.timelineEyebrow) +
            '<h2>' + esc(t.timelineTitle) + '</h2>' +
            '<p class="lead" style="margin-left:0">' + esc(t.timelineLead) + '</p>' +
          '</div>' +
          '<div class="timeline">' + rows + '</div>' +
        '</div></section>' +
        ctaHTML(t);
    },

    kompetens: function (t) {
      var cards = t.expertise.map(function (x) {
        return '<div class="card"><span class="accent-edge ' + x.tone + '"></span>' +
          '<h3>' + esc(x.title) + '</h3><p>' + esc(x.desc) + '</p></div>';
      }).join('');
      return '<section class="section alt"><div class="inner-xl">' +
          '<div class="section-head center big">' + eyebrow(t.expertiseEyebrow) +
            '<h2>' + esc(t.expertiseTitle) + '</h2>' +
            '<p class="lead">' + esc(t.expertiseLead) + '</p>' +
          '</div>' +
          '<div class="grid-cards">' + cards + '</div>' +
        '</div></section>' +
        clientsHTML(t) +
        ctaHTML(t);
    },

    home: function (t) {
      var h = t.home;
      var PORTRAIT = '/assets/moa-portrait.jpg';

      // Hero
      var hero = '<section class="home-hero"><div class="hh-inner">' +
          '<div class="hh-copy">' +
            eyebrow(h.heroEyebrow) +
            '<h1 class="hh-title">' + esc(h.heroA) + '<br>' + esc(h.heroB) + '<span class="accent">' + esc(h.heroItalic) + '</span></h1>' +
            '<p class="hh-lead">' + esc(h.heroLead) + '</p>' +
            '<div class="hh-actions">' +
              '<a class="btn btn-primary lg" href="#boka">' + esc(h.heroPrimary) + '</a>' +
              '<a class="btn btn-secondary lg" href="#bok">' + esc(h.heroSecondary) + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="hh-media"><div class="hh-media-bg"></div>' +
            '<div class="hh-frame"><img src="' + PORTRAIT + '" alt="Moa Collin" loading="eager"></div>' +
          '</div>' +
        '</div></section>';

      // Credentials strip
      var creds = '<div class="statband creds"><div class="inner">' +
        h.creds.map(function (c) {
          return '<div class="stat">' + (c.divider ? '<span class="divider"></span>' : '') +
            '<div class="body"><span class="figure">' + esc(c.year) + '</span>' +
            '<span class="label">' + esc(c.label) + '</span></div></div>';
        }).join('') + '</div></div>';

      // About
      var about = '<section class="section about-sec" id="om"><div class="inner-lg about">' +
          '<div class="about-media"><img src="' + PORTRAIT + '" alt="Moa Collin" loading="lazy"></div>' +
          '<div class="about-copy">' + eyebrow(h.aboutEyebrow) +
            '<h2>' + esc(h.aboutTitle) + '</h2>' +
            '<p>' + esc(h.aboutBody[0]) + '</p><p>' + esc(h.aboutBody[1]) + '</p>' +
          '</div>' +
        '</div></section>';

      // Offerings
      var offer = '<section class="section alt" id="forelasningar"><div class="inner-xl">' +
          '<div class="section-head center big">' + eyebrow(h.offerEyebrow) +
            '<h2>' + esc(h.offerTitle) + '</h2></div>' +
          '<div class="grid-cards">' +
            h.cards.map(function (c) {
              return '<a class="card offer link" href="' + c.href + '">' +
                '<span class="accent-edge ' + c.tone + '"></span>' +
                badge(c.badge, c.tone) +
                '<h3>' + esc(c.title) + '</h3><p>' + esc(c.desc) + '</p>' +
                '<span class="more">' + esc(c.cta) + ' →</span>' +
              '</a>';
            }).join('') +
          '</div>' +
        '</div></section>';

      // Quote
      var quote = '<section class="quote-sec"><div class="inner">' +
          '<span class="qmark" aria-hidden="true">&ldquo;</span>' +
          '<p class="quote">' + esc(h.quote) + '</p>' +
          '<span class="qwho">— ' + esc(h.quoteWho) + '</span>' +
        '</div></section>';

      // Book
      var bookMailto = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent((LANG === 'sv' ? 'Beställning: ' : 'Order: ') + h.bookTitle);
      var book = '<section class="section book-sec" id="bok"><div class="inner-lg book">' +
          '<div class="book-cover-wrap"><div class="book-cover">' +
            '<div class="bc-top"><span class="bc-rule"></span>' +
              '<span class="bc-kicker">' + esc(h.bookKicker) + '</span></div>' +
            '<div class="bc-title">' + esc(h.bookCoverA) + '<br><em>' + esc(h.bookCoverB) + '</em></div>' +
            '<span class="bc-who">' + esc(h.bookCoverWho) + '</span>' +
          '</div></div>' +
          '<div class="book-copy">' + eyebrow(h.bookEyebrow, 'warm') +
            '<h2>' + esc(h.bookTitle) + '</h2>' +
            '<p>' + esc(h.bookBody) + '</p>' +
            '<ul class="book-bullets">' + h.bookBullets.map(function (b) {
              return '<li><span class="tick" aria-hidden="true">✓</span>' + esc(b) + '</li>';
            }).join('') + '</ul>' +
            '<div class="book-buy"><a class="btn btn-accent lg" href="' + bookMailto + '">' + esc(h.bookCta) + '</a>' +
              '<span class="price">' + esc(h.bookPrice) + '</span></div>' +
          '</div>' +
        '</div></section>';

      // Booking form (or success state)
      var f = h.form;
      var inner;
      if (bookingSent) {
        inner = '<div class="booking-success"><div class="bs-check" aria-hidden="true">✓</div>' +
          '<p class="bs-title">' + esc(f.sent) + '</p>' +
          '<p class="bs-note">' + esc(f.sentNote) + '</p></div>';
      } else {
        var typeOpts = '<option value="">' + esc(f.typePlaceholder) + '</option>' +
          h.types.map(function (ty) { return '<option>' + esc(ty) + '</option>'; }).join('');
        inner = '<form id="booking-form" class="booking-form" novalidate>' +
            '<div class="field"><label for="bf-name">' + esc(f.name) + ' <span class="req">*</span></label>' +
              '<input id="bf-name" name="name" class="control" required></div>' +
            '<div class="field"><label for="bf-email">' + esc(f.email) + ' <span class="req">*</span></label>' +
              '<input id="bf-email" name="email" type="email" class="control" required></div>' +
            '<div class="field"><label for="bf-org">' + esc(f.org) + '</label>' +
              '<input id="bf-org" name="org" class="control"></div>' +
            '<div class="field"><label for="bf-type">' + esc(f.type) + '</label>' +
              '<div class="select-wrap"><select id="bf-type" name="type" class="control">' + typeOpts + '</select>' +
              '<span class="chev" aria-hidden="true">▼</span></div></div>' +
            '<div class="field span2"><label for="bf-msg">' + esc(f.msg) + '</label>' +
              '<textarea id="bf-msg" name="msg" rows="4" class="control" placeholder="' + esc(f.msgPlaceholder) + '"></textarea></div>' +
            '<input type="text" name="company_url" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
            '<div class="span2 form-error" id="bf-error" role="alert" hidden></div>' +
            '<div class="span2"><button type="submit" class="btn btn-primary lg" style="width:100%">' + esc(f.submit) + '</button></div>' +
          '</form>';
      }
      var booking = '<section class="section alt" id="boka"><div class="inner-md">' +
          '<div class="section-head center"><div class="center-eyebrow">' + eyebrow(h.bookingEyebrow) + '</div>' +
            '<h2>' + esc(h.bookingTitle) + '</h2>' +
            '<p class="lead">' + esc(h.bookingBody) + '</p></div>' +
          '<div class="card booking-card">' + inner + '</div>' +
        '</div></section>';

      return hero + creds + about + offer + quote + book + booking;
    }
  };

  /* ==========================================================================
     Boot
     ========================================================================== */
  var LANG = (function () {
    try { return localStorage.getItem('mc-lang') || 'sv'; } catch (e) { return 'sv'; }
  })();
  if (LANG !== 'sv' && LANG !== 'en') LANG = 'sv';

  function closeDrawer() {
    var drawer = document.getElementById('site-drawer');
    var overlay = document.querySelector('.drawer-overlay');
    var toggle = document.querySelector('.menu-toggle');
    if (drawer) { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
    if (overlay) overlay.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }

  function openDrawer() {
    var drawer = document.getElementById('site-drawer');
    var overlay = document.querySelector('.drawer-overlay');
    var toggle = document.querySelector('.menu-toggle');
    if (drawer) { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); }
    if (overlay) overlay.classList.add('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
    var firstLink = drawer && drawer.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function render() {
    var t = I18N[LANG];
    var page = document.body.getAttribute('data-page') || 'home';
    var activeKey = PAGE_ACTIVE_NAV[page];
    document.documentElement.lang = t.htmlLang;

    var header = document.getElementById('site-header');
    var main = document.getElementById('app');
    var footer = document.getElementById('site-footer');
    if (header) header.innerHTML = headerHTML(t, activeKey);
    if (main && PAGES[page]) main.innerHTML = PAGES[page](t);
    if (footer) footer.innerHTML = footerHTML(t);

    // Drawer lives at body level (outside the backdrop-filtered header) so its
    // fixed positioning fills the viewport. Created lazily on first render.
    var drawerRoot = document.getElementById('drawer-root');
    if (!drawerRoot) {
      drawerRoot = document.createElement('div');
      drawerRoot.id = 'drawer-root';
      document.body.appendChild(drawerRoot);
    }
    drawerRoot.innerHTML = drawerHTML(t, activeKey);

    // Booking form (homepage) → POST to /api/booking (MailerSend).
    // Falls back to a mailto link if the API isn't configured or errors.
    var bf = main && main.querySelector('#booking-form');
    if (bf) {
      bf.addEventListener('submit', function (e) {
        e.preventDefault();
        if (bf.reportValidity && !bf.reportValidity()) return;

        var f = I18N[LANG].home.form;
        var g = function (n) { var el = bf.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
        var btn = bf.querySelector('button[type="submit"]');
        var errBox = bf.querySelector('#bf-error');
        var origLabel = btn.textContent;

        errBox.hidden = true;
        btn.disabled = true;
        btn.textContent = f.sending;

        var payload = {
          name: g('name'), email: g('email'), org: g('org'),
          type: g('type'), msg: g('msg'), company_url: g('company_url'), lang: LANG
        };

        var fail = function () {
          btn.disabled = false;
          btn.textContent = origLabel;
          var sub = encodeURIComponent((LANG === 'sv' ? 'Bokningsförfrågan' : 'Booking request') + (g('name') ? ' – ' + g('name') : ''));
          errBox.innerHTML = esc(f.error) + ' <a href="mailto:' + EMAIL + '?subject=' + sub + '">' + EMAIL + '</a>';
          errBox.hidden = false;
        };

        fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (res) {
          if (res.ok) { bookingSent = true; render(); }
          else fail();
        }).catch(fail);
      });
    }

    // Header + drawer interactions. Queried at document level because the drawer
    // now lives in a body-level root, not inside the header element.
    // Language toggle (present in both header bar and drawer foot)
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = btn.getAttribute('data-lang');
        if (l === LANG) return;
        LANG = l;
        try { localStorage.setItem('mc-lang', l); } catch (e) {}
        render();
      });
    });
    // Hamburger drawer
    var toggle = header && header.querySelector('.menu-toggle');
    if (toggle) toggle.addEventListener('click', openDrawer);
    document.querySelectorAll('[data-drawer-close]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });
    // Close after navigating via a drawer link
    var drawer = document.getElementById('site-drawer');
    if (drawer) drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  // Global handlers (attached once): Escape closes the drawer; leaving mobile
  // width resets it so the desktop nav is never stuck behind an open drawer.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeDrawer();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();

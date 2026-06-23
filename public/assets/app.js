/* ==========================================================================
   Moa Collin — site runtime
   Shared header/footer, bilingual (SV/EN) content + language toggle.
   Each page sets <body data-page="..."> and provides <main id="app">.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Logo (inlined SVG paths from the design system Logo component) ---- */
  var MC_PATH = "M116.247 130.95L123.987 133.425V135H89.5622V133.425L97.6172 131.535L93.4772 76.77L94.2872 76.905L72.2822 135.315H62.4272L40.3772 77.265L41.1872 77.175L37.9022 131.715L45.6422 133.425V135H27.0572V133.425L34.3022 131.715L37.6772 75.825L29.5322 72.225V70.65H57.4772L75.6572 119.79L74.3522 119.745L92.7122 70.65H120.027V72.225L111.702 74.475L116.247 130.95ZM166.566 133.2C168.426 133.2 170.211 132.915 171.921 132.345C173.631 131.775 175.266 130.89 176.826 129.69L174.486 131.67L184.836 116.055H186.366L182.541 133.875C179.301 134.715 176.211 135.3 173.271 135.63C170.331 135.99 167.076 136.17 163.506 136.17C157.956 136.17 152.916 135.465 148.386 134.055C143.856 132.615 139.956 130.47 136.686 127.62C133.446 124.74 130.956 121.185 129.216 116.955C127.476 112.725 126.606 107.82 126.606 102.24C126.606 95.73 128.136 90.015 131.196 85.095C134.286 80.175 138.576 76.35 144.066 73.62C149.556 70.86 155.946 69.48 163.236 69.48C165.876 69.48 168.261 69.615 170.391 69.885C172.521 70.125 174.921 70.545 177.591 71.145L173.631 72.27L180.156 67.455H180.876L185.646 91.935L184.161 92.385L173.046 75.06L176.556 79.29C173.916 76.71 171.486 74.97 169.266 74.07C167.046 73.17 164.751 72.72 162.381 72.72C159.921 72.72 157.641 73.185 155.541 74.115C153.471 75.045 151.656 76.56 150.096 78.66C148.536 80.73 147.321 83.49 146.451 86.94C145.581 90.36 145.146 94.59 145.146 99.63C145.146 104.67 145.701 109.26 146.811 113.4C147.951 117.51 149.496 121.05 151.446 124.02C153.426 126.96 155.706 129.225 158.286 130.815C160.866 132.405 163.626 133.2 166.566 133.2Z";
  var WORD_PATH = "M353.46 111.74L364.2 114.26V116H330.12V114.26L340.86 111.74L335.16 36.38L336 36.5L302.1 117.2H300.06L263.7 38.54L264.54 38.36L259.74 111.74L271.68 114.26V116H245.22V114.26L255.96 111.74L260.94 35.84L249.96 31.94V30.2H273.18L306.72 102.86H304.44L334.68 30.2H359.16V31.94L347.28 34.4L353.46 111.74ZM397.194 114.56C401.074 114.56 404.334 113.46 406.974 111.26C409.614 109.06 411.594 105.8 412.914 101.48C414.274 97.12 414.954 91.74 414.954 85.34C414.954 78.9 414.294 73.52 412.974 69.2C411.654 64.84 409.694 61.56 407.094 59.36C404.534 57.12 401.354 56 397.554 56C393.674 56 390.414 57.1 387.774 59.3C385.134 61.5 383.134 64.78 381.774 69.14C380.454 73.46 379.794 78.82 379.794 85.22C379.794 91.62 380.454 97 381.774 101.36C383.094 105.72 385.034 109.02 387.594 111.26C390.194 113.46 393.394 114.56 397.194 114.56ZM397.074 117.2C391.634 117.2 386.674 115.84 382.194 113.12C377.754 110.4 374.214 106.64 371.574 101.84C368.934 97 367.614 91.46 367.614 85.22C367.614 78.98 368.954 73.46 371.634 68.66C374.354 63.86 377.974 60.12 382.494 57.44C387.054 54.72 392.114 53.36 397.674 53.36C403.234 53.36 408.234 54.72 412.674 57.44C417.114 60.16 420.634 63.92 423.234 68.72C425.834 73.52 427.134 79.06 427.134 85.34C427.134 91.58 425.754 97.1 422.994 101.9C420.274 106.7 416.634 110.46 412.074 113.18C407.514 115.86 402.514 117.2 397.074 117.2ZM473.855 76.04L474.515 78.56C468.875 80.32 464.295 82 460.775 83.6C457.295 85.2 454.635 86.8 452.795 88.4C450.955 90 449.695 91.68 449.015 93.44C448.335 95.2 447.995 97.14 447.995 99.26C447.995 102.7 448.995 105.3 450.995 107.06C452.995 108.78 455.435 109.64 458.315 109.64C460.635 109.64 462.655 109.2 464.375 108.32C466.095 107.4 467.435 106.08 468.395 104.36C469.395 102.6 469.895 100.46 469.895 97.94V70.4C469.895 66.28 468.875 63.16 466.835 61.04C464.835 58.92 461.775 57.86 457.655 57.86C455.695 57.86 453.715 58.02 451.715 58.34C449.755 58.62 448.215 59.04 447.095 59.6L450.275 57.2C450.155 58.68 449.955 60.22 449.675 61.82C449.435 63.38 449.115 64.8 448.715 66.08C448.355 67.36 447.915 68.32 447.395 68.96C446.875 69.6 446.075 70.1 444.995 70.46C443.955 70.82 442.875 71 441.755 71C440.315 71 439.155 70.72 438.275 70.16C437.435 69.56 437.015 68.64 437.015 67.4C437.015 65.72 437.815 64.06 439.415 62.42C441.015 60.74 443.075 59.22 445.595 57.86C448.155 56.5 450.895 55.42 453.815 54.62C456.775 53.78 459.595 53.36 462.275 53.36C466.795 53.36 470.415 54.02 473.135 55.34C475.855 56.66 477.835 58.52 479.075 60.92C480.315 63.28 480.935 66.06 480.935 69.26V104.84C480.935 106.16 481.135 107.22 481.535 108.02C481.975 108.82 482.575 109.4 483.335 109.76C484.095 110.12 484.955 110.3 485.915 110.3C487.275 110.3 488.615 110.08 489.935 109.64C491.295 109.2 492.695 108.48 494.135 107.48V109.1C491.175 112.62 488.555 114.86 486.275 115.82C483.995 116.74 481.655 117.2 479.255 117.2C476.895 117.2 475.035 116.68 473.675 115.64C472.315 114.56 471.335 113.02 470.735 111.02C470.175 109.02 469.835 106.62 469.715 103.82H469.895C469.215 106.38 468.115 108.68 466.595 110.72C465.075 112.72 463.235 114.3 461.075 115.46C458.915 116.62 456.535 117.2 453.935 117.2C448.975 117.2 444.835 115.88 441.515 113.24C438.195 110.6 436.535 106.76 436.535 101.72C436.535 99.08 436.975 96.76 437.855 94.76C438.775 92.72 440.515 90.78 443.075 88.94C445.675 87.1 449.435 85.16 454.355 83.12C459.315 81.08 465.815 78.72 473.855 76.04ZM571.928 114.62C574.808 114.62 577.668 114.08 580.508 113C583.388 111.88 586.228 110.08 589.028 107.6L586.448 110.3L597.968 92H599.648L594.848 114.02C590.528 115.34 586.528 116.22 582.848 116.66C579.168 117.1 575.148 117.32 570.788 117.32C563.948 117.32 557.608 116.38 551.768 114.5C545.968 112.62 540.908 109.8 536.588 106.04C532.268 102.24 528.908 97.54 526.507 91.94C524.108 86.3 522.908 79.74 522.908 72.26C522.908 63.66 524.868 56.12 528.788 49.64C532.708 43.12 538.128 38.04 545.048 34.4C552.008 30.72 560.048 28.88 569.168 28.88C572.568 28.88 575.768 29.08 578.768 29.48C581.808 29.84 585.028 30.42 588.428 31.22L584.588 32.18L591.848 26.66H592.688L598.388 57.02L596.768 57.32L584.107 36.26L587.168 39.8C583.568 37 580.148 35.02 576.908 33.86C573.708 32.7 570.388 32.12 566.948 32.12C563.268 32.12 559.768 32.78 556.448 34.1C553.168 35.42 550.248 37.56 547.688 40.52C545.168 43.44 543.168 47.36 541.688 52.28C540.248 57.16 539.528 63.2 539.528 70.4C539.528 77.8 540.388 84.26 542.108 89.78C543.828 95.3 546.188 99.9 549.188 103.58C552.188 107.26 555.628 110.02 559.508 111.86C563.428 113.7 567.568 114.62 571.928 114.62ZM637.969 114.26C641.409 114.26 644.269 113.22 646.549 111.14C648.869 109.06 650.589 105.92 651.709 101.72C652.869 97.48 653.449 92.18 653.449 85.82C653.449 79.34 652.889 73.92 651.769 69.56C650.689 65.16 649.009 61.86 646.729 59.66C644.489 57.42 641.629 56.3 638.149 56.3C634.709 56.3 631.829 57.36 629.509 59.48C627.229 61.56 625.509 64.7 624.349 68.9C623.229 73.1 622.669 78.38 622.669 84.74C622.669 91.22 623.229 96.66 624.349 101.06C625.469 105.42 627.149 108.72 629.389 110.96C631.669 113.16 634.529 114.26 637.969 114.26ZM637.669 117.32C631.989 117.32 626.869 115.96 622.309 113.24C617.749 110.52 614.149 106.76 611.509 101.96C608.869 97.12 607.549 91.56 607.549 85.28C607.549 79 608.909 73.46 611.629 68.66C614.389 63.82 618.109 60.04 622.789 57.32C627.469 54.6 632.709 53.24 638.509 53.24C644.309 53.24 649.469 54.6 653.989 57.32C658.509 60.04 662.069 63.8 664.669 68.6C667.309 73.4 668.629 78.96 668.629 85.28C668.629 91.56 667.229 97.12 664.429 101.96C661.629 106.76 657.889 110.52 653.209 113.24C648.529 115.96 643.349 117.32 637.669 117.32ZM696.729 112.46L704.649 114.32V116H674.769V114.32L682.629 112.46V38.84C682.109 38.56 681.369 38.16 680.409 37.64C679.489 37.12 678.389 36.5 677.109 35.78C675.829 35.02 674.409 34.2 672.849 33.32V32.06L696.189 26.84H696.729V37.82V112.46ZM730.831 112.46L738.751 114.32V116H708.871V114.32L716.731 112.46V38.84C716.211 38.56 715.471 38.16 714.511 37.64C713.591 37.12 712.491 36.5 711.211 35.78C709.931 35.02 708.511 34.2 706.951 33.32V32.06L730.291 26.84H730.831V37.82V112.46ZM757.913 44.84C755.153 44.84 752.973 43.94 751.373 42.14C749.813 40.3 749.033 38.22 749.033 35.9C749.033 33.62 749.813 31.66 751.373 30.02C752.973 28.34 755.153 27.5 757.913 27.5C760.673 27.5 762.793 28.34 764.273 30.02C765.793 31.66 766.553 33.62 766.553 35.9C766.553 38.22 765.793 40.3 764.273 42.14C762.793 43.94 760.673 44.84 757.913 44.84ZM765.833 52.7V64.7V112.46L773.573 114.32V116H743.813V114.32L751.733 112.46V66.08C751.293 65.72 750.653 65.24 749.813 64.64C749.013 64.04 748.073 63.36 746.993 62.6C745.913 61.8 744.753 60.94 743.513 60.02V58.76L765.293 52.7H765.833ZM800.457 65.3V112.46L808.257 114.32V116H778.497V114.32L786.357 112.46V66.08C785.717 65.56 784.797 64.84 783.597 63.92C782.397 63 780.597 61.7 778.197 60.02V58.76L799.977 52.7H800.457V65.3ZM817.617 114.32L825.417 112.46V74.48C825.417 71.96 824.997 69.88 824.157 68.24C823.317 66.6 822.017 65.38 820.257 64.58C818.537 63.74 816.297 63.32 813.537 63.32C810.777 63.32 808.097 63.7 805.497 64.46C802.937 65.22 800.697 66.06 798.777 66.98L798.177 65.78C801.297 63.14 803.977 61 806.217 59.36C808.497 57.72 810.537 56.48 812.337 55.64C814.137 54.76 815.857 54.16 817.497 53.84C819.137 53.52 820.917 53.36 822.837 53.36C828.637 53.36 832.857 54.92 835.497 58.04C838.177 61.16 839.517 65.98 839.517 72.5V112.46L847.437 114.32V116H817.617V114.32Z";
  var TAG_PATH = "M246.95 179V144.15H257.35C260.017 144.15 262.2 144.55 263.9 145.35C265.6 146.117 266.867 147.233 267.7 148.7C268.533 150.167 268.95 151.917 268.95 153.95C268.95 156.85 268.117 159.15 266.45 160.85C264.783 162.517 262.367 163.5 259.2 163.8C258.7 163.833 258.1 163.85 257.4 163.85C256.7 163.85 256.017 163.85 255.35 163.85H251.35V179H246.95ZM266.45 179L257.4 163.3L261.9 162.75L271.5 179H266.45ZM251.35 159.95H256.9C258.433 159.95 259.767 159.75 260.9 159.35C262.033 158.95 262.917 158.317 263.55 157.45C264.217 156.583 264.55 155.433 264.55 154C264.55 152.533 264.217 151.383 263.55 150.55C262.917 149.683 262.017 149.067 260.85 148.7C259.717 148.3 258.4 148.1 256.9 148.1H251.35V159.95ZM276.54 179V144.15H299.49V148.1H280.94V159.25H297.79V163.2H280.94V175.05H299.49V179H276.54ZM305.788 179V144.15H310.188V175.05H325.788V179H305.788ZM327.444 179L340.744 144.15H344.244L357.544 179H352.744L342.544 150.45L332.294 179H327.444ZM334.844 170.8L336.194 166.85H348.794L350.244 170.8H334.844ZM366.143 179V148.1H354.443V144.15H382.243V148.1H370.593V179H366.143ZM386.989 179V144.15H391.389V179H386.989ZM413.944 179.6C410.744 179.6 407.927 178.85 405.494 177.35C403.094 175.85 401.21 173.75 399.844 171.05C398.51 168.35 397.844 165.2 397.844 161.6C397.844 157.967 398.51 154.8 399.844 152.1C401.21 149.4 403.094 147.3 405.494 145.8C407.927 144.3 410.744 143.55 413.944 143.55C417.21 143.55 420.06 144.3 422.494 145.8C424.927 147.3 426.81 149.4 428.144 152.1C429.51 154.8 430.194 157.967 430.194 161.6C430.194 165.2 429.51 168.35 428.144 171.05C426.777 173.75 424.877 175.85 422.444 177.35C420.01 178.85 417.177 179.6 413.944 179.6ZM413.944 175.4C416.377 175.4 418.46 174.833 420.194 173.7C421.96 172.567 423.327 170.967 424.294 168.9C425.26 166.833 425.744 164.4 425.744 161.6C425.744 158.767 425.26 156.317 424.294 154.25C423.327 152.183 421.96 150.583 420.194 149.45C418.46 148.317 416.377 147.75 413.944 147.75C411.577 147.75 409.51 148.317 407.744 149.45C405.977 150.55 404.61 152.133 403.644 154.2C402.71 156.267 402.244 158.733 402.244 161.6C402.244 164.433 402.71 166.883 403.644 168.95C404.61 171.017 405.977 172.617 407.744 173.75C409.51 174.85 411.577 175.4 413.944 175.4ZM436.696 179V144.15H441.346L459.196 173.3H458.196V144.15H462.596V179H457.846L440.096 149.8H441.096V179H436.696ZM470.485 179V144.15H493.435V148.1H474.885V159.25H491.735V163.2H474.885V175.05H493.435V179H470.485ZM499.733 179V144.15H504.133V175.05H519.733V179H499.733ZM524.489 179V144.15H528.889V175.05H544.489V179H524.489ZM551.788 179V148.1H540.088V144.15H567.888V148.1H556.238V179H551.788ZM585.622 179V144.15H590.022V175.05H605.622V179H585.622ZM610.378 179V144.15H633.328V148.1H614.778V159.25H631.628V163.2H614.778V175.05H633.328V179H610.378ZM639.626 179V144.15H649.276C654.976 144.15 659.392 145.7 662.526 148.8C665.659 151.867 667.226 156.217 667.226 161.85C667.226 167.383 665.676 171.633 662.576 174.6C659.476 177.533 655.026 179 649.226 179H639.626ZM644.026 174.95H648.826C651.792 174.95 654.309 174.517 656.376 173.65C658.476 172.75 660.059 171.333 661.126 169.4C662.226 167.433 662.776 164.867 662.776 161.7C662.776 158.533 662.226 155.967 661.126 154C660.059 152 658.509 150.533 656.476 149.6C654.476 148.667 652.059 148.2 649.226 148.2H644.026V174.95ZM669.045 179L682.345 144.15H685.845L699.145 179H694.345L684.145 150.45L673.895 179H669.045ZM676.445 170.8L677.795 166.85H690.395L691.845 170.8H676.445ZM703.981 179V144.15H714.381C717.048 144.15 719.231 144.55 720.931 145.35C722.631 146.117 723.898 147.233 724.731 148.7C725.565 150.167 725.981 151.917 725.981 153.95C725.981 156.85 725.148 159.15 723.481 160.85C721.815 162.517 719.398 163.5 716.231 163.8C715.731 163.833 715.131 163.85 714.431 163.85C713.731 163.85 713.048 163.85 712.381 163.85H708.381V179H703.981ZM723.481 179L714.431 163.3L718.931 162.75L728.531 179H723.481ZM708.381 159.95H713.931C715.465 159.95 716.798 159.75 717.931 159.35C719.065 158.95 719.948 158.317 720.581 157.45C721.248 156.583 721.581 155.433 721.581 154C721.581 152.533 721.248 151.383 720.581 150.55C719.948 149.683 719.048 149.067 717.881 148.7C716.748 148.3 715.431 148.1 713.931 148.1H708.381V159.95ZM743.782 179.55C740.282 179.55 737.415 178.633 735.182 176.8C732.948 174.967 731.582 172.533 731.082 169.5L735.382 168.45C735.748 170.783 736.698 172.567 738.232 173.8C739.798 175 741.698 175.6 743.932 175.6C745.232 175.6 746.398 175.35 747.432 174.85C748.465 174.35 749.282 173.65 749.882 172.75C750.482 171.817 750.782 170.767 750.782 169.6C750.782 168.367 750.448 167.35 749.782 166.55C749.115 165.75 748.182 165.05 746.982 164.45C745.815 163.85 744.448 163.25 742.882 162.65C740.948 161.917 739.248 161.117 737.782 160.25C736.348 159.383 735.232 158.35 734.432 157.15C733.632 155.917 733.232 154.417 733.232 152.65C733.232 150.883 733.665 149.317 734.532 147.95C735.398 146.583 736.615 145.517 738.182 144.75C739.748 143.95 741.565 143.55 743.632 143.55C745.832 143.55 747.782 144.05 749.482 145.05C751.182 146.05 752.548 147.533 753.582 149.5L750.082 151.65C749.315 150.283 748.382 149.25 747.282 148.55C746.182 147.817 744.915 147.45 743.482 147.45C742.348 147.45 741.332 147.667 740.432 148.1C739.565 148.533 738.882 149.133 738.382 149.9C737.882 150.667 737.632 151.55 737.632 152.55C737.632 153.617 737.932 154.533 738.532 155.3C739.132 156.033 739.998 156.683 741.132 157.25C742.265 157.817 743.632 158.4 745.232 159C747.265 159.767 749.015 160.6 750.482 161.5C751.948 162.4 753.082 163.483 753.882 164.75C754.715 165.983 755.132 167.517 755.132 169.35C755.132 171.317 754.648 173.067 753.682 174.6C752.715 176.133 751.382 177.35 749.682 178.25C747.982 179.117 746.015 179.55 743.782 179.55ZM764.804 167.9V162.3L782.154 144.15H788.054L764.804 167.9ZM761.354 179V144.15H765.754V179H761.354ZM783.004 179L771.154 160.25L774.454 157.2L788.154 179H783.004ZM789.944 179L803.244 144.15H806.744L820.044 179H815.244L805.044 150.45L794.794 179H789.944ZM797.344 170.8L798.694 166.85H811.294L812.744 170.8H797.344ZM824.88 179V144.15H835.28C839.046 144.15 841.913 144.983 843.88 146.65C845.88 148.317 846.88 150.767 846.88 154C846.88 157.233 845.88 159.717 843.88 161.45C841.88 163.15 839.013 164 835.28 164H829.23V179H824.88ZM829.23 160.1H834.83C837.23 160.1 839.096 159.617 840.43 158.65C841.796 157.65 842.48 156.117 842.48 154.05C842.48 152.017 841.813 150.517 840.48 149.55C839.18 148.583 837.296 148.1 834.83 148.1H829.23V160.1Z";

  function logo(tone, size) {
    var onDark = tone === 'paper';
    var tile = onDark ? 'var(--paper)' : 'var(--pine)';
    var mc = onDark ? 'var(--pine)' : 'var(--paper)';
    var text = onDark ? 'var(--paper)' : 'var(--ink)';
    var tag = onDark ? 'var(--paper)' : 'var(--ink-3)';
    var h = { sm: 28, md: 40, lg: 56, xl: 80 }[size] || 40;
    var tagOpacity = onDark ? 0.72 : 1;
    return '<svg height="' + h + '" viewBox="0 0 883 215" role="img" aria-label="Moa Collin — Relationellt ledarskap" style="display:block;width:auto">' +
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
  var ROUTES = { home: '/', experience: '/erfarenhet',
    skola: '/forelasning-skola', foraldrar: '/coaching-foraldrar', bok: '/boken' };
  // Which nav item is highlighted on each page (homepage anchors aren't).
  var PAGE_ACTIVE_NAV = { home: null, experience: 'erfarenhet',
    skola: 'skola', foraldrar: 'foraldrar', bok: 'bok' };
  var bookingSent = false; // preserved across re-renders (e.g. language toggle)

  /* ==========================================================================
     Content — Swedish (default) and English
     ========================================================================== */
  var I18N = {
    sv: {
      htmlLang: 'sv',
      nav: [
        { key: 'skola', label: 'Föreläsning för skolor', href: '/forelasning-skola' },
        { key: 'foraldrar', label: 'Coaching för föräldrar', href: '/coaching-foraldrar' },
        { key: 'erfarenhet', label: 'Erfarenhet', href: '/erfarenhet' },
        { key: 'bok', label: 'Boken', href: '/boken' },
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

      back: 'Tillbaka',
      subpages: {
        skola: {
          badge: 'Skola', badgeTone: 'brand', detailTone: 'brand',
          title: 'Föreläsning för skolor',
          lead: 'Relationellt ledarskap i utmanande grupper. En föreläsning som ger pedagoger och elevhälsa konkreta verktyg för att skapa studiero genom relation — inte genom kontroll.',
          heroCta: 'Boka föreläsning',
          contentEyebrow: 'Innehåll', contentTitle: 'Det här tar vi upp',
          checklist: [
            { title: 'Relationellt förhållningssätt', desc: 'Varför relationen är grunden för allt lärande — och hur du bygger den även med de svåraste eleverna.' },
            { title: 'Konkreta klassrumsverktyg', desc: 'Check in, check out och tydliga rutiner du kan använda redan dagen efter.' },
            { title: 'Utmanande elevgrupper', desc: 'Strategier för grupper där det stökar — utan att hamna i tillsägelser och konflikt.' },
            { title: 'Tid för dialog', desc: 'Utrymme för era frågor och exempel från er egen vardag.' }
          ],
          detailLabel: 'Upplägg',
          details: [
            { label: 'Längd', value: 'Halvdag eller heldag' },
            { label: 'Format', value: 'På plats eller digitalt' },
            { label: 'Anpassning', value: 'Utformas efter er skola' }
          ],
          audienceEyebrow: 'För vem', audienceTitle: 'Vem är föreläsningen för?',
          audience: ['Lärare', 'Arbetslag', 'Elevhälsoteam', 'Skolledning', 'Fritidspersonal'],
          quote: 'God relation är början till varje lösning.', quoteWho: 'Moa Collin',
          ctaEyebrow: 'Boka', ctaTitle: 'Boka en föreläsning till er skola',
          ctaBody: 'Berätta kort om er skola och ert tillfälle så återkommer jag inom 24 timmar.',
          ctaPrimary: 'Skicka en förfrågan'
        },
        foraldrar: {
          badge: 'Föräldrar', badgeTone: 'warm', detailTone: 'warm',
          title: 'Coaching för föräldrar',
          lead: 'Personlig coaching och föreläsningar för dig som är förälder till en ung människa, 12–16 år. Stöd, verktyg och samtal som utgår från just er situation.',
          heroCta: 'Boka ett samtal',
          contentEyebrow: 'Innehåll', contentTitle: 'Så arbetar vi tillsammans',
          checklist: [
            { title: 'Personliga samtal', desc: 'Vi utgår från er vardag och de utmaningar ni faktiskt möter hemma.' },
            { title: 'Verktyg för kommunikation', desc: 'Konkreta sätt att prata med din tonåring så att ni når varandra.' },
            { title: 'Stöd i relationen', desc: 'Hur du bygger och behåller en god relation även i tonåren.' },
            { title: 'Uppföljning', desc: 'Vi följer upp mellan tillfällena så att det blir verklig förändring.' }
          ],
          detailLabel: 'Upplägg',
          details: [
            { label: 'Form', value: 'Enskilt eller i grupp' },
            { label: 'Format', value: 'Digitalt eller på plats' },
            { label: 'Upplägg', value: 'Enstaka samtal eller serie' }
          ],
          audienceEyebrow: 'För vem', audienceTitle: 'Vem är coachingen för?',
          audience: ['Föräldrar', 'Vårdnadshavare', 'Bonusföräldrar', 'Familjehem'],
          quote: 'Du och din tonåring – tillsammans, inte mot varandra.', quoteWho: 'Moa Collin',
          ctaEyebrow: 'Boka', ctaTitle: 'Boka ett samtal',
          ctaBody: 'Berätta kort om er situation så återkommer jag inom 24 timmar.',
          ctaPrimary: 'Skicka en förfrågan'
        },
        bok: {
          badge: 'Boken', badgeTone: 'amber',
          lead: 'En praktisk handbok om relationellt ledarskap i klassrummet — för lärare, elevhälsa och föräldrar. Byggd på tjugofem år i de svåraste klassrummen, med verktyg du kan använda redan imorgon.',
          contentEyebrow: 'Innehåll', contentTitle: 'Vad du får ut av boken',
          features: [
            { n: '01', title: 'Relationellt förhållningssätt', desc: 'Grunden: varför relationen kommer först — och hur du bygger den med varje elev.' },
            { n: '02', title: 'Konkreta verktyg', desc: 'Check in, check out och rutiner som skapar trygghet och studiero.' },
            { n: '03', title: 'Exempel från verkligheten', desc: 'Berättelser och situationer från resursskolan och de tuffaste grupperna.' }
          ],
          quote: 'Du, jag ser att du har lite svårt att komma igång. Vill du ha hjälp med det?', quoteWho: 'Ur boken',
          audienceEyebrow: 'För vem', audienceTitle: 'Vem är boken för?',
          audienceBody: 'För lärare, elevhälsoteam och skolledare som vill skapa studiero genom relation — och för föräldrar som vill förstå sin tonåring bättre.'
        }
      },

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
          { badge: 'Skola', tone: 'brand', title: 'Föreläsning för skolor', desc: 'Relationellt ledarskap i utmanande grupper — konkreta verktyg för pedagoger och elevhälsa.', cta: 'Läs mer', href: '/forelasning-skola' },
          { badge: 'Föräldrar', tone: 'warm', title: 'Coaching för föräldrar', desc: 'Personlig coaching och föreläsningar för dig som är förälder till en ung människa.', cta: 'Läs mer', href: '/coaching-foraldrar' },
          { badge: 'Bok', tone: 'amber', title: 'Boken', desc: 'Från stök till studiero — min handbok om relationellt förhållningssätt.', cta: 'Läs mer', href: '/boken' }
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
        { key: 'skola', label: 'Talks for schools', href: '/forelasning-skola' },
        { key: 'foraldrar', label: 'Coaching for parents', href: '/coaching-foraldrar' },
        { key: 'erfarenhet', label: 'Experience', href: '/erfarenhet' },
        { key: 'bok', label: 'The book', href: '/boken' },
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

      back: 'Back',
      subpages: {
        skola: {
          badge: 'Schools', badgeTone: 'brand', detailTone: 'brand',
          title: 'Talks for schools',
          lead: 'Relational leadership in challenging groups. A talk that gives teachers and student-health teams concrete tools to create calm through relationship — not through control.',
          heroCta: 'Book a talk',
          contentEyebrow: 'Content', contentTitle: 'What we cover',
          checklist: [
            { title: 'The relational approach', desc: 'Why the relationship is the foundation of all learning — and how to build it even with the toughest students.' },
            { title: 'Concrete classroom tools', desc: 'Check in, check out and clear routines you can use the very next day.' },
            { title: 'Challenging student groups', desc: 'Strategies for groups where things get disruptive — without ending up in reprimands and conflict.' },
            { title: 'Time for dialogue', desc: 'Room for your questions and examples from your own everyday reality.' }
          ],
          detailLabel: 'Format',
          details: [
            { label: 'Length', value: 'Half day or full day' },
            { label: 'Format', value: 'On site or digital' },
            { label: 'Adaptation', value: 'Tailored to your school' }
          ],
          audienceEyebrow: 'For whom', audienceTitle: 'Who is the talk for?',
          audience: ['Teachers', 'Teaching teams', 'Student-health teams', 'School leadership', 'After-school staff'],
          quote: 'A good relationship is the beginning of every solution.', quoteWho: 'Moa Collin',
          ctaEyebrow: 'Booking', ctaTitle: 'Book a talk for your school',
          ctaBody: 'Tell me a little about your school and your event and I’ll get back to you within 24 hours.',
          ctaPrimary: 'Send a request'
        },
        foraldrar: {
          badge: 'Parents', badgeTone: 'warm', detailTone: 'warm',
          title: 'Coaching for parents',
          lead: 'Personal coaching and talks for parents of a young person aged 12–16. Support, tools and conversations that start from your situation.',
          heroCta: 'Book a conversation',
          contentEyebrow: 'Content', contentTitle: 'How we work together',
          checklist: [
            { title: 'Personal conversations', desc: 'We start from your everyday life and the challenges you actually face at home.' },
            { title: 'Communication tools', desc: 'Concrete ways to talk with your teenager so you reach each other.' },
            { title: 'Support for the relationship', desc: 'How to build and keep a good relationship through the teenage years.' },
            { title: 'Follow-up', desc: 'We follow up between sessions so it leads to real change.' }
          ],
          detailLabel: 'Format',
          details: [
            { label: 'Form', value: 'One-to-one or group' },
            { label: 'Format', value: 'Digital or on site' },
            { label: 'Setup', value: 'Single session or a series' }
          ],
          audienceEyebrow: 'For whom', audienceTitle: 'Who is the coaching for?',
          audience: ['Parents', 'Guardians', 'Bonus parents', 'Foster families'],
          quote: 'You and your teenager — together, not against each other.', quoteWho: 'Moa Collin',
          ctaEyebrow: 'Booking', ctaTitle: 'Book a conversation',
          ctaBody: 'Tell me a little about your situation and I’ll get back to you within 24 hours.',
          ctaPrimary: 'Send a request'
        },
        bok: {
          badge: 'The book', badgeTone: 'amber',
          lead: 'A practical handbook on relational leadership in the classroom — for teachers, student-health teams and parents. Built on twenty-five years in the toughest classrooms, with tools you can use tomorrow.',
          contentEyebrow: 'Content', contentTitle: 'What you get from the book',
          features: [
            { n: '01', title: 'The relational approach', desc: 'The foundation: why the relationship comes first — and how to build it with every student.' },
            { n: '02', title: 'Concrete tools', desc: 'Check in, check out and routines that create safety and calm.' },
            { n: '03', title: 'Examples from reality', desc: 'Stories and situations from the resource school and the toughest groups.' }
          ],
          quote: 'Hey, I can see you’re having a hard time getting started. Do you want help with that?', quoteWho: 'From the book',
          audienceEyebrow: 'For whom', audienceTitle: 'Who is the book for?',
          audienceBody: 'For teachers, student-health teams and school leaders who want to create calm through relationship — and for parents who want to understand their teenager better.'
        }
      },

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
          { badge: 'Schools', tone: 'brand', title: 'Talks for schools', desc: 'Relational leadership in challenging groups — concrete tools for teachers and student health teams.', cta: 'Learn more', href: '/forelasning-skola' },
          { badge: 'Parents', tone: 'warm', title: 'Coaching for parents', desc: 'Personal coaching and talks for parents of a young person aged 12–16.', cta: 'Learn more', href: '/coaching-foraldrar' },
          { badge: 'Book', tone: 'amber', title: 'The book', desc: 'From chaos to calm — my handbook on the relational approach.', cta: 'Learn more', href: '/boken' }
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

  // Book section — shared by the homepage and the dedicated /boken page.
  function bookMailtoURL(t) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent((LANG === 'sv' ? 'Beställning: ' : 'Order: ') + t.home.bookTitle);
  }
  function bookCoverHTML(h) {
    return '<div class="book-cover">' +
        '<div class="bc-top"><span class="bc-rule"></span>' +
          '<span class="bc-kicker">' + esc(h.bookKicker) + '</span></div>' +
        '<div class="bc-title">' + esc(h.bookCoverA) + '<br><em>' + esc(h.bookCoverB) + '</em></div>' +
        '<span class="bc-who">' + esc(h.bookCoverWho) + '</span>' +
      '</div>';
  }
  function bookSectionHTML(t) {
    var h = t.home;
    return '<section class="section book-sec" id="bok"><div class="inner-lg book">' +
        '<div class="book-cover-wrap">' + bookCoverHTML(h) + '</div>' +
        '<div class="book-copy">' + eyebrow(h.bookEyebrow, 'warm') +
          '<h2>' + esc(h.bookTitle) + '</h2>' +
          '<p>' + esc(h.bookBody) + '</p>' +
          '<ul class="book-bullets">' + h.bookBullets.map(function (b) {
            return '<li><span class="tick" aria-hidden="true">✓</span>' + esc(b) + '</li>';
          }).join('') + '</ul>' +
          '<div class="book-buy"><a class="btn btn-accent lg" href="' + bookMailtoURL(t) + '">' + esc(h.bookCta) + '</a>' +
            '<span class="price">' + esc(h.bookPrice) + '</span></div>' +
        '</div>' +
      '</div></section>';
  }

  // Rich offering subpage (skola / foraldrar): hero, two-column content + detail
  // card, audience pills, quote band and a booking CTA. Reuses existing tokens.
  function offeringPageHTML(t, s) {
    var hero = '<section class="hero subpage"><div class="inner">' +
        badge(s.badge, s.badgeTone) +
        '<h1>' + esc(s.title) + '</h1>' +
        '<p class="lead">' + esc(s.lead) + '</p>' +
        '<div class="hero-cta"><a class="btn btn-primary lg" href="/#boka">' + esc(s.heroCta) + '</a></div>' +
      '</div></section>';

    var checks = s.checklist.map(function (c) {
      return '<li><span class="ck" aria-hidden="true">✓</span>' +
        '<div class="ck-body"><h3>' + esc(c.title) + '</h3><p>' + esc(c.desc) + '</p></div></li>';
    }).join('');
    var rows = s.details.map(function (d) {
      return '<div class="detail-row"><span class="dl">' + esc(d.label) + '</span>' +
        '<span class="dv">' + esc(d.value) + '</span></div>';
    }).join('');
    var content = '<section class="section alt"><div class="inner-xl split">' +
        '<div class="split-main">' +
          '<div class="section-head">' + eyebrow(s.contentEyebrow) + '<h2>' + esc(s.contentTitle) + '</h2></div>' +
          '<ul class="checklist">' + checks + '</ul>' +
        '</div>' +
        '<aside class="detail-card"><span class="accent-edge ' + s.detailTone + '"></span>' +
          '<p class="detail-label">' + esc(s.detailLabel) + '</p>' + rows +
        '</aside>' +
      '</div></section>';

    var pills = s.audience.map(function (a) { return '<span class="pill">' + esc(a) + '</span>'; }).join('');
    var audience = '<section class="section"><div class="inner-lg">' +
        '<div class="section-head">' + eyebrow(s.audienceEyebrow) + '<h2>' + esc(s.audienceTitle) + '</h2></div>' +
        '<div class="pills">' + pills + '</div>' +
      '</div></section>';

    var quote = '<section class="quote-sec"><div class="inner">' +
        '<span class="qmark" aria-hidden="true">&ldquo;</span>' +
        '<p class="quote">' + esc(s.quote) + '</p>' +
        '<span class="qwho">— ' + esc(s.quoteWho) + '</span>' +
      '</div></section>';

    var cta = '<section class="section"><div class="inner-md">' +
        '<div class="section-head center big"><div class="center-eyebrow">' + eyebrow(s.ctaEyebrow) + '</div>' +
          '<h2>' + esc(s.ctaTitle) + '</h2>' +
          '<p class="lead">' + esc(s.ctaBody) + '</p></div>' +
        '<div class="cta-actions">' +
          '<a class="btn btn-primary lg" href="/#boka">' + esc(s.ctaPrimary) + '</a>' +
          '<a class="btn btn-secondary lg" href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
        '</div>' +
      '</div></section>';

    return hero + content + audience + quote + cta;
  }

  // Dedicated book page: cover + buy hero, numbered chapters, quote, "for whom".
  function bookPageHTML(t) {
    var h = t.home; var s = t.subpages.bok; var buy = bookMailtoURL(t);
    var priceBlock = '<div class="book-buy"><a class="btn btn-accent lg" href="' + buy + '">' + esc(h.bookCta) + '</a>' +
      '<span class="price">' + esc(h.bookPrice) + '</span></div>';

    var hero = '<section class="hero book-hero"><div class="inner split">' +
        '<div class="book-cover-wrap">' + bookCoverHTML(h) + '</div>' +
        '<div class="book-hero-copy">' +
          badge(s.badge, s.badgeTone) +
          '<h1>' + esc(h.bookTitle) + '</h1>' +
          '<p class="lead">' + esc(s.lead) + '</p>' +
          priceBlock +
        '</div>' +
      '</div></section>';

    var cards = s.features.map(function (f) {
      return '<div class="card num-card"><span class="num">' + esc(f.n) + '</span>' +
        '<h3>' + esc(f.title) + '</h3><p>' + esc(f.desc) + '</p></div>';
    }).join('');
    var content = '<section class="section alt"><div class="inner-xl">' +
        '<div class="section-head center big"><div class="center-eyebrow">' + eyebrow(s.contentEyebrow) + '</div>' +
          '<h2>' + esc(s.contentTitle) + '</h2></div>' +
        '<div class="grid-cards">' + cards + '</div>' +
      '</div></section>';

    var quote = '<section class="quote-sec"><div class="inner">' +
        '<span class="qmark" aria-hidden="true">&ldquo;</span>' +
        '<p class="quote">' + esc(s.quote) + '</p>' +
        '<span class="qwho">— ' + esc(s.quoteWho) + '</span>' +
      '</div></section>';

    var cta = '<section class="section"><div class="inner-md">' +
        '<div class="section-head center big"><div class="center-eyebrow">' + eyebrow(s.audienceEyebrow) + '</div>' +
          '<h2>' + esc(s.audienceTitle) + '</h2>' +
          '<p class="lead">' + esc(s.audienceBody) + '</p></div>' +
        '<div class="cta-actions">' + priceBlock + '</div>' +
      '</div></section>';

    return hero + content + quote + cta;
  }

  /* ---- Page bodies ---- */
  var PAGES = {
    experience: function (t) {
      var rows = t.timeline.map(function (e) {
        return '<div class="tl-row"><div class="tl-year">' + esc(e.year) + '</div>' +
          '<div class="tl-body"><span class="tl-dot"></span>' +
          '<h3>' + esc(e.title) + '</h3><p>' + esc(e.desc) + '</p></div></div>';
      }).join('');
      var cards = t.expertise.map(function (x) {
        return '<div class="card"><span class="accent-edge ' + x.tone + '"></span>' +
          '<h3>' + esc(x.title) + '</h3><p>' + esc(x.desc) + '</p></div>';
      }).join('');
      return '<section class="hero"><div class="inner">' +
          eyebrow(t.pageEyebrow) +
          '<h1>' + esc(t.pageTitle) + '</h1>' +
          '<p class="lead">' + esc(t.pageLead) + '</p>' +
        '</div></section>' +
        statbandHTML(t) +
        '<section class="section"><div class="inner-md">' +
          '<div class="section-head">' + eyebrow(t.timelineEyebrow) +
            '<h2>' + esc(t.timelineTitle) + '</h2></div>' +
          '<div class="timeline">' + rows + '</div>' +
        '</div></section>' +
        '<section class="section alt"><div class="inner-xl">' +
          '<div class="section-head center big">' + eyebrow(t.expertiseEyebrow) +
            '<h2>' + esc(t.expertiseTitle) + '</h2></div>' +
          '<div class="grid-cards">' + cards + '</div>' +
        '</div></section>' +
        clientsHTML(t) +
        ctaHTML(t);
    },

    skola: function (t) { return offeringPageHTML(t, t.subpages.skola); },

    foraldrar: function (t) { return offeringPageHTML(t, t.subpages.foraldrar); },

    bok: function (t) { return bookPageHTML(t); },

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

      // Book (shared with the /boken page)
      var book = bookSectionHTML(t);

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

  // Global handler (attached once): Escape closes the drawer.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();

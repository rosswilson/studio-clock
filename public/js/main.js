function StudioClock(canvas) {
  let state = [false, false, false, false];

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key >= 1 && event.key <= 4) {
        let index = event.key - 1;
        state[index] = !state[index];
      }
    },
    false
  );

  let context = canvas.getContext("2d");

  let canvas_width = canvas.width;
  let canvas_height = canvas.height;

  let digiclocksize = canvas_height / 5.5;
  let indtxtsize = canvas_height / 7;

  let digiclockspace = canvas_height / 10.5;
  let dotsize = canvas_height / 90;
  let xclockpos = canvas_width * 0.2875;
  let ycenter = canvas_height / 2;

  let indboxy = canvas_height / 6;
  let indboxx = canvas_width / 2.5;

  let hradius = canvas_height / 2.5;
  let secradius = hradius - canvas_height / 26;

  let txthmy = ycenter - digiclockspace;
  let txtsecy = ycenter + digiclockspace;

  let xtxtpos = canvas_width * 0.75;
  let xindboxpos = xtxtpos - indboxx / 2;

  let ind1y = ycenter * 0.4 - indboxy / 2;
  let ind2y = ycenter * 0.8 - indboxy / 2;
  let ind3y = ycenter * 1.2 - indboxy / 2;
  let ind4y = ycenter * 1.6 - indboxy / 2;

  // Parametric Equations of a Circle to get the markers
  // 90 Degree ofset to start at 0 seconds marker

  // Equation for second markers
  function paraeqsmx(smx) {
    return xclockpos - secradius * Math.cos((smx + 90) * (Math.PI / 180));
  }

  function paraeqsmy(smy) {
    return ycenter - secradius * Math.sin((smy + 90) * (Math.PI / 180));
  }

  // Equations for hour markers
  function paraeqshx(shx) {
    return xclockpos - hradius * Math.cos((shx + 90) * (Math.PI / 180));
  }

  function paraeqshy(shy) {
    return ycenter - hradius * Math.sin((shy + 90) * (Math.PI / 180));
  }

  function draw() {
    let d = new Date();

    // Current time
    let sectime = d.getSeconds();
    let mintime = d.getMinutes();
    let hourtime = d.getHours();

    // To get the dots in sync with the seconds
    let secdeg = (sectime + 1) * 6;

    // Clear the canvas
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    // Draw second markers
    let smx = 0;
    let smy = 0;

    context.fillStyle = "#FFFFFF";

    while (smx < secdeg) {
      context.beginPath();
      context.arc(paraeqsmx(smx), paraeqsmy(smy), dotsize, 0, 2 * Math.PI);
      context.fill();

      smy += 6; // 6 Degrees per second
      smx += 6;
    }

    // Draw hour markers
    let shx = 0;
    let shy = 0;

    context.fillStyle = "#FFFFFF";

    while (shx < 360) {
      context.beginPath();
      context.arc(paraeqshx(shx), paraeqshy(shy), dotsize, 0, 2 * Math.PI);
      context.fill();

      shy += 30; // 30 Degrees per hour
      shx += 30;
    }

    // Render digial clock
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#FFFFFF";

    function pad(num, size) {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }

    context.font = digiclocksize + "px Helvetica";
    context.fillText(
      pad(hourtime, 2) + ":" + pad(mintime, 2),
      xclockpos,
      txthmy
    );

    context.font = indtxtsize + "px Helvetica";
    context.fillText(pad(sectime, 2), xclockpos, txtsecy);

    // Draw the indicators
    context.font = indtxtsize + "px Helvetica-Bold";

    function buildIndicator(index, state) {
      let offColor = "#2F2F2F";

      if (index == 0) {
        context.fillStyle = state ? "#FF0000" : offColor;
        context.fillRect(xindboxpos, ind1y, indboxx, indboxy);

        context.fillStyle = "#000000";
        context.fillText("MIC", xtxtpos, ycenter * 0.4);
      } else if (index == 1) {
        context.fillStyle = state ? "#FFFF00" : offColor;
        context.fillRect(xindboxpos, ind2y, indboxx, indboxy);

        context.fillStyle = "#000000";
        context.fillText("PHONE", xtxtpos, ycenter * 0.8);
      } else if (index == 2) {
        context.fillStyle = state ? "#00FF00" : offColor;
        context.fillRect(xindboxpos, ind3y, indboxx, indboxy);

        context.fillStyle = "#000000";
        context.fillText("ON AIR", xtxtpos, ycenter * 1.2);
      } else {
        context.fillStyle = state ? "#00FFFF" : offColor;
        context.fillRect(xindboxpos, ind4y, indboxx, indboxy);

        context.fillStyle = "#000000";
        context.fillText("DOOR", xtxtpos, ycenter * 1.6);
      }
    }

    buildIndicator(0, state[0]);
    buildIndicator(1, state[1]);
    buildIndicator(2, state[2]);
    buildIndicator(3, state[3]);
  }

  return {
    draw: draw,
  };
}

let clock = new StudioClock(document.getElementById("clockCanvas"));
setInterval(clock.draw, 100);

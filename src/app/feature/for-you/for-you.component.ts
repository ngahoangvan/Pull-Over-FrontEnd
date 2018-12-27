import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare const p5: any;
import * as html2canvas from 'html2canvas';
import { ApiService } from 'src/app/shares/service/api.service';
import { END_POINT } from 'src/app/shares/service/api.registry';
import { LoginService } from 'src/app/shares/service/login.service';
import { CacheService } from 'src/app/shares/service/cache.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
})
export class ForYouComponent implements OnInit {
  p5: any;
  width: number;
  listColor = [];
  listFontSize = [];
  listImgUser: Array<any>;
  @ViewChild('canvas') canvas: ElementRef;

  constructor(private apiService: ApiService,
              private cacheService: CacheService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.width = this.canvas.nativeElement.offsetWidth;
    this.createCanvas();
    this.setListColor();
    this.setListFontSize();
    this.setListImgUser();
  }

  saveCanvas() {
    if (this.loginService.isLogin) {
      html2canvas(document.getElementById('dgcanvas')).then((canvas) => {
        const imgageData = canvas.toDataURL('image/png');
        const newData = imgageData.split(',')[1];
        const body = {
          image: newData
        };
        this.apiService.postImg(body).subscribe(value => {
        const imgLink = {
         url: value.data.link
        };
        const username = localStorage.getItem('username');
        const apiKey = localStorage.getItem('token');
        const param = `?username=${username}&api_key=${apiKey}`;
         this.apiService.post([END_POINT.user], imgLink, param).subscribe(res => {
          this.setListImgUser();
         });
       });
      });
    }
  }

  setListFontSize() {
    for (let i = 5; i <= 20; i++) {
      this.listFontSize.push(i);
    }
  }

  setListImgUser() {
    if (this.loginService.isLogin) {
      const username = localStorage.getItem('username');
      const apiKey = localStorage.getItem('token');
      const param = `?username=${username}&api_key=${apiKey}`;
      this.apiService.get([END_POINT.authUser], param).subscribe(res => {
        const id = res.objects[0].id;
        this.apiService.get([END_POINT.user], id).subscribe(dataUser => {
          this.listImgUser = dataUser.objects;
        });
      });
    }
  }

  setListColor() {
    this.listColor = [
      '#E52B50',
      '#FFBF00',
      '#9966CC',
      '#FBCEB1',
      '#7FFFD4',
      '#007FFF',
      '#89CFF0',
      '#F5F5DC',
      '#000000',
      '#0000FF',
      '#0095B6',
      '#8A2BE2',
      '#DE5D83',
      '#CD7F32',
      '#7FFF00',
      '#0047AB',
      '#EE82EE',
      '#FFFF00',
      '#00FF7F',
      '#C0C0C0',
      '#FF007F',
      '#FFC0CB',
      '#FFE5B4',
      '#800000',
      '#FFFFF0',
      '#A7FC00',
      '#C0C0C0',
      '#708090',
      '#00FF7F',
      '#FFD700',
      '#FF2400',
      '#92000A',
      '#A7FC00'
    ];
  }

  createCanvas() {
    const obj = { width: this.canvas.nativeElement.offsetWidth };
    this.p5 = new p5(this.sketch.bind(obj));
  }

  sketch(p: any) {
    const PRIMARY_COLOR = '#f9da67';
    const W_COLOR = '#ffff';
    const B_COLOR = '#000000';
    const INVI_COLOR = '#ffffff00';

    const width = this.width;
    let hog;
    let isDrawing = false;
    let isDrawMode = false;
    let isBtnDrawEnable = false;
    let isBtnFillEnable = false;
    let btnDraw;
    let btnFill;
    let isFillMode;
    let colorDraw = '#00000F';
    let currentPath = [];
    let inputWeith;
    let weight = 2;
    let textBox;
    let textInput;
    let italic;
    let bold;
    let btnOpenText;
    let textLeft;
    let textRight;
    let textCenter;
    let fontSizeElement;
    let isItalicMode = false;
    let isBoldMode = false;
    let isTextMode = false;

    const indexDrawingHaveColor = [];
    const drawing = [{
      currentPath,
      color: '#00000F',
      isFill: false,
      colorFill: colorDraw,
      weight: weight
    }];

    p.setup = () => {
      const background = p.createCanvas(width, 500);
      hog = p.loadImage('assets/images/w.png');
      background.parent('dgcanvas');
      background.mouseReleased(p.endPath);

      btnDraw = p.select('#btnDraw');
      btnDraw.mousePressed(p.openDrawMode);
      background.mousePressed(p.startPath);

      btnFill = p.select('#btnFill');
      btnFill.mousePressed(p.openFillMode);

      const btnClear = p.select('#btnClear');
      btnClear.mousePressed(p.clearDrawing);

      const choiceColor = p.selectAll('.color-item');
      for (let i = 0; i < choiceColor.length; i++) {
        choiceColor[i].mousePressed(p.changeColor.bind(choiceColor[i]));
      }

      const currentColor = p.select('#currentColor');
      currentColor.style('background-color', colorDraw);

      inputWeith = p.select('.weight-input');
      inputWeith.input(p.changeWeight);

      textInput = p.select('.text-input');
      btnOpenText = p.select('.text-edit');
      btnOpenText.mousePressed(p.showInputText);

      italic = p.select('.italic');
      italic.mousePressed(p.openItalicMode);
      bold = p.select('.bold');
      bold.mousePressed(p.openBoldMode);

      textLeft = p.select('.text-left');
      textLeft.mousePressed(p.textAlign.bind('left'));
      textRight = p.select('.text-right');
      textRight.mousePressed(p.textAlign.bind('right'));
      textCenter = p.select('.text-center');
      textCenter.mousePressed(p.textAlign.bind('center'));

      fontSizeElement = p.select('.font-size');
      fontSizeElement.input(p.changeFontSize);
    };

    p.changeFontSize = () => {
      const fontSize = fontSizeElement.value();
      textInput.style('font-size', fontSize);
    };

    p.changeWeight = () => {
      weight = inputWeith.value();
    };

    p.textAlign = function() {
      const action = this;
      if (isTextMode) {
        switch (action) {
          case 'left': {
            textInput.style('text-align', 'left');
            textLeft.style('background', PRIMARY_COLOR);
            textRight.style('background', W_COLOR);
            textCenter.style('background', W_COLOR);
            break;
          }
          case 'right': {
            textInput.style('text-align', 'right');
            textRight.style('background', PRIMARY_COLOR);
            textLeft.style('background', W_COLOR);
            textCenter.style('background', W_COLOR);
            break;
          }
          case 'center': {
            textInput.style('text-align', 'center');
            textCenter.style('background', PRIMARY_COLOR);
            textRight.style('background', W_COLOR);
            textLeft.style('background', W_COLOR);
            break;
          }
        }
      }
    };

    p.openBoldMode = () => {
      isBoldMode = !isBoldMode;
      if (isBoldMode && isTextMode) {
        bold.style('background', PRIMARY_COLOR);
        textInput.style('font-weight', 'bold');
      } else {
        textInput.style('font-weight', 'normal');
        bold.style('background', W_COLOR);
      }
    };

    p.openItalicMode = () => {
      isItalicMode = !isItalicMode;
      if (isItalicMode && isTextMode) {
        italic.style('background', PRIMARY_COLOR);
        textInput.style('font-style', 'italic');
      } else {
        textInput.style('font-style', 'normal');
        italic.style('background', W_COLOR);
      }
    };

    p.showInputText = () => {
      isTextMode = !isTextMode;
      if (isTextMode) {
        btnOpenText.style('background', PRIMARY_COLOR);
        textBox = p.select('.text-box');
        textBox.style('opacity', 1);
        textBox.style('top', '100px');
        textBox.style('left', '190px');
      } else {
        isItalicMode = true;
        isBoldMode = true;
        p.resetAlignBtn();
        p.openItalicMode();
        p.openBoldMode();
        btnOpenText.style('background', W_COLOR);
        textBox.style('opacity', 0);
      }
    };

    p.resetAlignBtn = () => {
      textRight.style('background', W_COLOR);
      textCenter.style('background', W_COLOR);
      textLeft.style('background', W_COLOR);
    };

    p.openDrawMode = () => {
      isBtnDrawEnable = !isBtnDrawEnable;
      if (isBtnDrawEnable) {
        btnDraw.style('background', PRIMARY_COLOR);
        btnDraw.style('color', W_COLOR);
        isDrawMode = true;

        btnFill.style('background', W_COLOR);
        btnFill.style('color', B_COLOR);
        isFillMode = false;
        isBtnFillEnable = false;
      } else {
        btnDraw.style('background', W_COLOR);
        btnDraw.style('color', B_COLOR);
        isDrawMode = false;
      }
    };

    p.openFillMode = () => {
      isBtnFillEnable = !isBtnFillEnable;
      isFillMode = true;
      if (isBtnFillEnable) {
        btnFill.style('background', PRIMARY_COLOR);
        btnFill.style('color', W_COLOR);
        isFillMode = true;

        btnDraw.style('background', W_COLOR);
        btnDraw.style('color', B_COLOR);
        isDrawMode = false;
        isBtnDrawEnable = false;
      } else {
        btnFill.style('background', W_COLOR);
        btnFill.style('color', B_COLOR);
        isFillMode = false;
      }
    };

    p.changeColor = function changeColor() {
      colorDraw = this.html();
      const currentColor = p.select('#currentColor');
      currentColor.style('background-color', colorDraw);
      drawing.map((item, index) => {
        if (indexDrawingHaveColor.indexOf(index) <= -1) {
          return item.colorFill = colorDraw;
        }
      });
    };

    p.startPath = () => {
      if (isDrawMode) {
        isDrawing = true;
        currentPath = [];
        const item = {
          currentPath,
          color: colorDraw,
          isFill: false,
          colorFill: colorDraw,
          weight: weight
        };
        drawing.push(item);
      }
      if (isFillMode) {
        p.findIndexDrawFill();
      }
    };

    p.endPath = () => {
      isDrawing = false;
    };

    p.findIndexDrawFill = () => {
      if (drawing.length) {
        drawing.map((item, index) => {
          const xPoints = item.currentPath.map(v => v.x);
          const yPoints = item.currentPath.map(v => v.y);
          const minX = p.min(xPoints);
          const maxX = p.max(xPoints);
          const minY = p.min(yPoints);
          const maxY = p.max(yPoints);

          if (p.mouseX <= maxX && p.mouseX >= minX && p.mouseY <= maxY && p.mouseY >= minY) {
            drawing[index].isFill = true;
            indexDrawingHaveColor.push(index);
          }
        });
      }
    };

    p.clearDrawing = () => {
      drawing.length = 0;
    };

    p.draw = () => {
      p.background(255);
      p.fill(0);
      p.image(hog, 100, 0);

      if (isDrawing) {
        const item = {
            x: p.mouseX,
            y: p.mouseY
        };
        currentPath.push(item);
      }

      p.fill(colorDraw);
      for (let i = 0; i < drawing.length; i++) {
        const path = drawing[i].currentPath;
        p.strokeWeight(drawing[i].weight);
        p.beginShape();
        if (drawing[i].isFill) {
          p.fill(drawing[i].colorFill);
        } else {
          p.fill('#ffffff00');
        }
        p.stroke(drawing[i].color);
        for (let j = 0; j < path.length; j++) {
          p.curveVertex(path[j].x, path[j].y);
        }
        p.endShape();
      }
    };
  }
}

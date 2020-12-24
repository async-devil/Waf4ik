class CSSToCanavas {
  public data: string;

  public set set(data: string) {
    this.data = data;
  }

  public isCSS(): boolean {
    if (this.data.search(/linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/gm) === -1) {
      return false;
    }

    return true;
  }

  public cssToCanvas(): Array<Array<any>> {
    let data = this.data;

    if (!this.isCSS()) {
      return [
        ['#FF0F7B', 0],
        ['#F89C2A', 1],
      ]; //! Error gradient
    }

    let points: string[] = [];
    data = data.replace(/(linear-gradient\()|(\);?$)/gm, '');

    points = data.split(/,(?!\d)/gm);

    if (points[0].search(/^\d{0,3}deg$/gm) !== -1) {
      points.splice(0, 1);
    }

    let pointsInfo: Array<Array<any>> = [];
    for (let i = 0; i < points.length; i += 1) {
      pointsInfo.push(points[i].replace(/^ /gm, '').split(' '));

      pointsInfo[i][1] = pointsInfo[i][1].replace('%', '');
      pointsInfo[i][1] = parseInt(pointsInfo[i][1]) / 100;
    }

    return pointsInfo;
  }

  public get getInfo() {
    if (!this.data) throw new Error('Data is not set');
    return this.cssToCanvas();
  }
}

export { CSSToCanavas as default };

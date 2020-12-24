import CSSToCanavas from '../public/ts/cssToCanvas';

describe('isCSS tests', () => {
  describe('Correct values', () => {
    test('Linear gradient test with degrees and rgba', () => {
      const CTC = new CSSToCanavas();
      CTC.set = 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);';
      expect(CTC.isCSS()).toBe(true);
    });

    test('Linear gradient test without degrees and with rgb', () => {
      const CTC = new CSSToCanavas();
      CTC.set = 'linear-gradient(rgb(34,193,195) 0%, rgb(253,187,45) 100%);';
      expect(CTC.isCSS()).toBe(true);
    });

    test('Linear gradient test without degrees and with hex', () => {
      const CTC = new CSSToCanavas();
      CTC.set = 'linear-gradient(#FF0F7B 0%, #F89C2A 100%);';
      expect(CTC.isCSS()).toBe(true);
    });
  });

  describe('Incorrect values', () => {
    test('Linear gradient test without linear-gradient phrase', () => {
      const CTC = new CSSToCanavas();
      CTC.set = '#FF0F7B 0%, #F89C2A 100%';
      expect(CTC.isCSS()).toBe(false);
    });

    test('Linear gradient test without brackets', () => {
      const CTC = new CSSToCanavas();
      CTC.set = 'linear-gradient #FF0F7B 0%, #F89C2A 100%';
      expect(CTC.isCSS()).toBe(false);
    });
  });
});

describe('cssToCanvas tests', () => {
  test('Linear gradient test with degrees and rgba', () => {
    const CTC = new CSSToCanavas();
    CTC.set = 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);';
    expect(CTC.cssToCanvas()).toStrictEqual([
      ['rgba(34,193,195,1)', 0],
      ['rgba(253,187,45,1)', 1],
    ]);
  });

  test('Linear gradient test without degrees and with hex', () => {
    const CTC = new CSSToCanavas();
    CTC.set = 'linear-gradient(0deg, #FF0F7B 0%, #F89C2A 100%);';
    expect(CTC.cssToCanvas()).toStrictEqual([
      ['#FF0F7B', 0],
      ['#F89C2A', 1],
    ]);
  });
});

describe('getInfo tests', () => {
  test('Linear gradient test without degrees and with hex', () => {
    const CTC = new CSSToCanavas();
    CTC.set = 'linear-gradient(0deg, #FF0F7B 0%, #F89C2A 100%);';
    const output = CTC.getInfo;
    expect(output).toStrictEqual([
      ['#FF0F7B', 0],
      ['#F89C2A', 1],
    ]);
  });
});

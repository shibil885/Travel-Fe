import { IsLikedPipe } from './is-liked.pipe';

describe('IsLikedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLikedPipe();
    expect(pipe).toBeTruthy();
  });
});

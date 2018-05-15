module.exports = (n, block) => {
  let htmlBlock = '';
  for (let i = 1; i <= n; i++) {
    htmlBlock += block.fn(i);
  }
  return htmlBlock;
};

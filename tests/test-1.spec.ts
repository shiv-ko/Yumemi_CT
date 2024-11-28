import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://yumemi-33l5yse2y-kouki-shibatas-projects.vercel.app/');
  await page.getByText('北海道').click();
  await page.getByText('北海道 青森県 岩手県 宮城県 秋田県 山形県 福島県 茨城県 栃木県 群馬県 埼玉県 千葉県 東京都 神奈川県 新潟県 富山県 石川県 福井県 山梨県 長野県').click();
  await page.getByText('茨城県').click();
  await page.getByText('岩手県').click();
  await page.getByRole('heading', { name: '都道府県を選択してください' }).click();
  await page.getByRole('heading', { name: '人口構成データ可視化ツール' }).click();
  await page.getByText('年少人口').click();
  await page.getByText('生産年齢人口').click();
  await page.getByText('老年人口').click();
  await page.getByText('196519751985199520052015202520352045045000090000013500001800000').click();
  await page.getByText('総人口').click();
  await page.getByText('長崎県').click();
});
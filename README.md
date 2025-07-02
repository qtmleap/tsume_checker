## Next.js Template Project

TypeScript + Bun + NextJS + TailwindCSSで動作するSSRのウェブサイトです

### 技術スタック

- DevContainer
  - ホストマシンから分断したクリーンな開発環境
- [Next.js](https://nextjs.org/)
  - SSR, SSG等に対応したReactの定番フレームワーク
- [Node.js](https://github.com/nodejs/node)
- [Bun](https://github.com/oven-sh/bun)
  - 軽量・高速なNode.jsランタイム
- [Tanstack Query](https://tanstack.com/)
  - Webアプリケーション、ルーティング、状態管理、データ可視化、データグリッド／テーブルなどのための、ヘッドレスで型安全かつ強力なユーティリティライブラリ
- [commitlint](https://github.com/conventional-changelog/commitlint)
  - 厳格なコミットルールを設定
- [husky](https://github.com/typicode/husky)
  - コミット時の挙動を管理
- [lint-staged](https://github.com/lint-staged/lint-staged)
  - 自動でファイルのフォーマットを実行
- [PR Agent](https://github.com/Codium-ai/pr-agent)
  - LLMがコードレビューを実行
- [Shadcn](https://ui.shadcn.com/)
  - 軽量なTailwindCSSと親和性の高いフレームワーク
- [TailwindCSS](https://tailwindcss.com/)
  - モダンなユーティリティファーストなCSSフレームワーク
- [React Hook Form](https://react-hook-form.com/)
  - Zodと組み合わせるフォーム管理ライブラリ
- [Zodios](https://www.zodios.org/)
  - Zodと組み合わせるRESTfulなAPIクライアントライブラリ
- [GitDoc](https://github.com/lostintangent/gitdoc)
  - LLMを利用して自動でコミットメッセージを作成
- GitHub Actions
  - CI/CDの自動実行
    - コードレビュー
    - コミットメッセージのチェック
    - コードチェック
    - テスト実行
    - ビルドチェック

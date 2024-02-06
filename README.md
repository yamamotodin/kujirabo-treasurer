# kujirabo-treasurer
電子帳簿やるよ！

# 概要
どれもこれもクラウドの会計ソフトは高いから電子帳簿保存法に対応するためのソフトウェアを自作します。

# 要件
1. 帳簿を保存する要件について、電子帳簿保存法（クラウド）に準拠する
2. 機能要件として必須要件を下記とする
   1. (App) カメラを使って領収証などを登録するアプリ
   2. (API) アプリからのデータを保存する上記を保存するバックエンド
   3. (Management) 登録したデータを閲覧、削除できる管理画面
   5. (Infra) AWS で Serverless 構成を採用して安くすませる
3. 同上のオプション要件は下記、必要に応じて順次必須要件に昇格する
   1. (App), (Management)から登録したデータを編集できること
   2. (ALL) テナント及びユーザ管理
   3. (NFR) セキュリティ、ログ、可用性などの考慮
   4. (Non-functional requirements, NFR) 証跡系の充実

# 全体概要図

architecture.drawio

# 技術スタック

* (APP) android/iphoneのアプリでflutter
* (API) APIGateway+Lambda+EFS(Sqlite3)
* (Management) Next.js
* (Infra) CDKまたはCDKTF
* (NFR) AWS SecurityHub, Trail, CloudWatch

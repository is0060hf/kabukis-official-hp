#!/bin/bash

# Claude AI シェルエイリアスセットアップスクリプト
# このスクリプトは便利なClaude AIエイリアスを追加します

# 色付き出力用の定義
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Claude AIエイリアスのセットアップを開始します...${NC}"

# シェルの種類を判定
if [ -n "$ZSH_VERSION" ]; then
    SHELL_TYPE="zsh"
    RC_FILE="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_TYPE="bash"
    RC_FILE="$HOME/.bashrc"
else
    echo -e "${RED}エラー: サポートされていないシェルです。${NC}"
    exit 1
fi

echo -e "${GREEN}検出されたシェル: $SHELL_TYPE${NC}"
echo -e "${GREEN}設定ファイル: $RC_FILE${NC}"

# バックアップの作成
BACKUP_FILE="${RC_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$RC_FILE" "$BACKUP_FILE"
echo -e "${GREEN}バックアップを作成しました: $BACKUP_FILE${NC}"

# エイリアスの定義
ALIASES='
# ===== Claude AI エイリアス =====

# Claude対話モード
alias cl="claude"

# ファイルをレビュー
crf() {
    if [ -z "$1" ]; then
        echo "使用方法: crf <ファイルパス>"
        return 1
    fi
    claude --print "このコードをレビューしてください: $(cat "$1")"
}

# git diffをレビュー
alias crd="claude --print '\''以下の変更をレビューしてください: '\''$(git diff)"

# ステージング済みの変更をレビュー
alias crds="claude --print '\''以下の変更をレビューしてください: '\''$(git diff --cached)"

# コンポーネント生成
cgc() {
    if [ -z "$1" ]; then
        echo "使用方法: cgc <コンポーネント名>"
        return 1
    fi
    claude --print "React/TypeScriptコンポーネントを生成してください: $1"
}

# テスト生成
cgt() {
    if [ -z "$1" ]; then
        echo "使用方法: cgt <ファイルパス>"
        return 1
    fi
    claude --print "このコードのJestテストを生成してください: $(cat "$1")"
}

# リファクタリング提案
crefactor() {
    if [ -z "$1" ]; then
        echo "使用方法: crefactor <ファイルパス>"
        return 1
    fi
    claude --print "このコードのリファクタリング提案をしてください: $(cat "$1")"
}

# バグ検出
cbug() {
    if [ -z "$1" ]; then
        echo "使用方法: cbug <ファイルパス>"
        return 1
    fi
    claude --print "このコードの潜在的なバグを検出してください: $(cat "$1")"
}

# WCAG 2.2アクセシビリティチェック
ca11y() {
    if [ -z "$1" ]; then
        echo "使用方法: ca11y <ファイルパス>"
        return 1
    fi
    claude --print "このコードのWCAG 2.2準拠をチェックしてください: $(cat "$1")"
}

# プロジェクト全体の分析
canalyze() {
    claude --print "現在のプロジェクトの構造を分析してください: $(find . -name '\''*.ts'\'' -o -name '\''*.tsx'\'' -o -name '\''*.js'\'' -o -name '\''*.jsx'\'' | head -50)"
}

# ドキュメント生成
cdoc() {
    if [ -z "$1" ]; then
        echo "使用方法: cdoc <ファイルパス>"
        return 1
    fi
    claude --print "このコードのドキュメント（JSDoc/TSDoc）を生成してください: $(cat "$1")"
}

# 最適化提案
coptimize() {
    if [ -z "$1" ]; then
        echo "使用方法: coptimize <ファイルパス>"
        return 1
    fi
    claude --print "このコードのパフォーマンス最適化を提案してください: $(cat "$1")"
}

# セキュリティチェック
csecurity() {
    if [ -z "$1" ]; then
        echo "使用方法: csecurity <ファイルパス>"
        return 1
    fi
    claude --print "このコードのセキュリティ問題をチェックしてください: $(cat "$1")"
}

# ===== Claude AI エイリアス終了 =====
'

# エイリアスがすでに存在するかチェック
if grep -q "Claude AI エイリアス" "$RC_FILE"; then
    echo -e "${YELLOW}警告: Claude AIエイリアスは既に設定されています。${NC}"
    echo -e "${YELLOW}既存の設定を更新しますか？ (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}セットアップを中止しました。${NC}"
        exit 0
    fi
    
    # 既存のエイリアスを削除
    sed -i.bak '/# ===== Claude AI エイリアス =====/,/# ===== Claude AI エイリアス終了 =====/d' "$RC_FILE"
fi

# エイリアスを追加
echo "$ALIASES" >> "$RC_FILE"

echo -e "${GREEN}✓ エイリアスを追加しました。${NC}"
echo ""
echo -e "${BLUE}追加されたエイリアス:${NC}"
echo "  cl         - Claude対話モード"
echo "  crf        - ファイルをレビュー"
echo "  crd        - git diffをレビュー"
echo "  crds       - ステージング済みの変更をレビュー"
echo "  cgc        - コンポーネント生成"
echo "  cgt        - テスト生成"
echo "  crefactor  - リファクタリング提案"
echo "  cbug       - バグ検出"
echo "  ca11y      - アクセシビリティチェック"
echo "  canalyze   - プロジェクト分析"
echo "  cdoc       - ドキュメント生成"
echo "  coptimize  - 最適化提案"
echo "  csecurity  - セキュリティチェック"
echo ""
echo -e "${YELLOW}注意: 変更を反映するには、以下のコマンドを実行してください:${NC}"
echo "  source $RC_FILE"
echo ""
echo -e "${GREEN}セットアップが完了しました！${NC}" 
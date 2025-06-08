#!/bin/bash

# Claude AI セットアップ診断スクリプト
# このスクリプトはClaude AI統合の設定を診断し、問題があれば修正を提案します

# 色付き出力用の定義
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Claude AI セットアップ診断を開始します...${NC}"
echo ""

# 診断結果を保存する配列
declare -a ISSUES=()
declare -a WARNINGS=()
declare -a SUCCESS=()

# 1. Claude CLIのインストール確認
echo -e "${BLUE}1. Claude CLIのインストール確認...${NC}"
if command -v claude &> /dev/null; then
    CLAUDE_VERSION=$(claude --version 2>&1 || echo "バージョン情報なし")
    SUCCESS+=("✓ Claude CLIがインストールされています: $CLAUDE_VERSION")
    echo -e "${GREEN}✓ Claude CLIが見つかりました${NC}"
else
    ISSUES+=("✗ Claude CLIがインストールされていません")
    echo -e "${RED}✗ Claude CLIが見つかりません${NC}"
    echo -e "${YELLOW}  → npm install -g @anthropic-ai/claude-code を実行してください${NC}"
fi
echo ""

# 2. Node.jsバージョン確認
echo -e "${BLUE}2. Node.jsバージョン確認...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR_VERSION" -ge 18 ]; then
        SUCCESS+=("✓ Node.js $NODE_VERSION がインストールされています")
        echo -e "${GREEN}✓ Node.js $NODE_VERSION${NC}"
    else
        WARNINGS+=("⚠ Node.js $NODE_VERSION は古いバージョンです（推奨: 18以上）")
        echo -e "${YELLOW}⚠ Node.js $NODE_VERSION は古いバージョンです${NC}"
    fi
else
    ISSUES+=("✗ Node.jsがインストールされていません")
    echo -e "${RED}✗ Node.jsが見つかりません${NC}"
fi
echo ""

# 3. pre-commitフックの確認
echo -e "${BLUE}3. pre-commitフックの確認...${NC}"
PRE_COMMIT_FILE=".git/hooks/pre-commit"
if [ -f "$PRE_COMMIT_FILE" ]; then
    if [ -x "$PRE_COMMIT_FILE" ]; then
        if grep -q "Claude AI" "$PRE_COMMIT_FILE"; then
            SUCCESS+=("✓ pre-commitフックが正しく設定されています")
            echo -e "${GREEN}✓ pre-commitフックが設定されています${NC}"
        else
            WARNINGS+=("⚠ pre-commitフックにClaude AI設定が見つかりません")
            echo -e "${YELLOW}⚠ pre-commitフックが他の用途で使用されています${NC}"
        fi
    else
        ISSUES+=("✗ pre-commitフックに実行権限がありません")
        echo -e "${RED}✗ pre-commitフックに実行権限がありません${NC}"
        echo -e "${YELLOW}  → chmod +x $PRE_COMMIT_FILE を実行してください${NC}"
    fi
else
    ISSUES+=("✗ pre-commitフックが存在しません")
    echo -e "${RED}✗ pre-commitフックが見つかりません${NC}"
fi
echo ""

# 4. 環境変数ANTHROPIC_API_KEYの確認
echo -e "${BLUE}4. Anthropic APIキーの確認...${NC}"
if [ -n "$ANTHROPIC_API_KEY" ]; then
    SUCCESS+=("✓ ANTHROPIC_API_KEY環境変数が設定されています")
    echo -e "${GREEN}✓ APIキーが設定されています${NC}"
else
    WARNINGS+=("⚠ ANTHROPIC_API_KEY環境変数が設定されていません")
    echo -e "${YELLOW}⚠ APIキーが設定されていません${NC}"
    echo -e "${YELLOW}  → export ANTHROPIC_API_KEY='your-api-key' を実行してください${NC}"
fi
echo ""

# 5. VSCodeタスク設定の確認
echo -e "${BLUE}5. VSCodeタスク設定の確認...${NC}"
VSCODE_TASKS_FILE=".vscode/tasks.json"
if [ -f "$VSCODE_TASKS_FILE" ]; then
    if grep -q "Claude:" "$VSCODE_TASKS_FILE"; then
        SUCCESS+=("✓ VSCodeタスクが設定されています")
        echo -e "${GREEN}✓ VSCodeタスクが設定されています${NC}"
    else
        WARNINGS+=("⚠ VSCodeタスクにClaude設定が見つかりません")
        echo -e "${YELLOW}⚠ VSCodeタスクが設定されていません${NC}"
    fi
else
    WARNINGS+=("⚠ VSCodeタスク設定ファイルが存在しません")
    echo -e "${YELLOW}⚠ .vscode/tasks.jsonが見つかりません${NC}"
fi
echo ""

# 6. gitignoreの確認
echo -e "${BLUE}6. .gitignoreの確認...${NC}"
if [ -f ".gitignore" ]; then
    MISSING_PATTERNS=()
    if ! grep -q "*.claude-tmp" ".gitignore"; then
        MISSING_PATTERNS+=("*.claude-tmp")
    fi
    if ! grep -q "claude-debug.log" ".gitignore"; then
        MISSING_PATTERNS+=("claude-debug.log")
    fi
    
    if [ ${#MISSING_PATTERNS[@]} -eq 0 ]; then
        SUCCESS+=("✓ .gitignoreが適切に設定されています")
        echo -e "${GREEN}✓ .gitignoreが設定されています${NC}"
    else
        WARNINGS+=("⚠ .gitignoreに以下のパターンを追加してください: ${MISSING_PATTERNS[*]}")
        echo -e "${YELLOW}⚠ .gitignoreに追加が必要です${NC}"
        for pattern in "${MISSING_PATTERNS[@]}"; do
            echo -e "${YELLOW}  → $pattern${NC}"
        done
    fi
else
    WARNINGS+=("⚠ .gitignoreファイルが存在しません")
    echo -e "${YELLOW}⚠ .gitignoreが見つかりません${NC}"
fi
echo ""

# 7. ネットワーク接続確認
echo -e "${BLUE}7. Anthropic APIへの接続確認...${NC}"
if curl -s --head --request GET https://api.anthropic.com | grep "200 OK" > /dev/null; then
    SUCCESS+=("✓ Anthropic APIに接続できます")
    echo -e "${GREEN}✓ ネットワーク接続OK${NC}"
else
    WARNINGS+=("⚠ Anthropic APIへの接続に問題がある可能性があります")
    echo -e "${YELLOW}⚠ API接続に問題がある可能性があります${NC}"
fi
echo ""

# 診断結果のサマリー
echo -e "${BLUE}========== 診断結果サマリー ==========${NC}"
echo ""

if [ ${#SUCCESS[@]} -gt 0 ]; then
    echo -e "${GREEN}成功項目 (${#SUCCESS[@]})${NC}"
    for item in "${SUCCESS[@]}"; do
        echo -e "${GREEN}$item${NC}"
    done
    echo ""
fi

if [ ${#WARNINGS[@]} -gt 0 ]; then
    echo -e "${YELLOW}警告項目 (${#WARNINGS[@]})${NC}"
    for item in "${WARNINGS[@]}"; do
        echo -e "${YELLOW}$item${NC}"
    done
    echo ""
fi

if [ ${#ISSUES[@]} -gt 0 ]; then
    echo -e "${RED}問題項目 (${#ISSUES[@]})${NC}"
    for item in "${ISSUES[@]}"; do
        echo -e "${RED}$item${NC}"
    done
    echo ""
fi

# 自動修正の提案
if [ ${#ISSUES[@]} -gt 0 ] || [ ${#WARNINGS[@]} -gt 0 ]; then
    echo -e "${BLUE}========== 修正提案 ==========${NC}"
    echo ""
    
    # Claude CLIのインストール
    if [[ " ${ISSUES[@]} " =~ "Claude CLIがインストールされていません" ]]; then
        echo -e "${YELLOW}1. Claude CLIをインストール:${NC}"
        echo "   npm install -g @anthropic-ai/claude-code"
        echo ""
    fi
    
    # pre-commitフックの権限
    if [[ " ${ISSUES[@]} " =~ "pre-commitフックに実行権限がありません" ]]; then
        echo -e "${YELLOW}2. pre-commitフックに実行権限を付与:${NC}"
        echo "   chmod +x .git/hooks/pre-commit"
        echo ""
    fi
    
    # .gitignoreの更新
    if [ ${#MISSING_PATTERNS[@]} -gt 0 ]; then
        echo -e "${YELLOW}3. .gitignoreに以下を追加:${NC}"
        for pattern in "${MISSING_PATTERNS[@]}"; do
            echo "   echo '$pattern' >> .gitignore"
        done
        echo ""
    fi
    
    echo -e "${BLUE}自動修正を実行しますか？ (y/N)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        # 自動修正の実行
        if [[ " ${ISSUES[@]} " =~ "pre-commitフックに実行権限がありません" ]]; then
            chmod +x .git/hooks/pre-commit
            echo -e "${GREEN}✓ pre-commitフックに実行権限を付与しました${NC}"
        fi
        
        if [ ${#MISSING_PATTERNS[@]} -gt 0 ]; then
            for pattern in "${MISSING_PATTERNS[@]}"; do
                echo "$pattern" >> .gitignore
            done
            echo -e "${GREEN}✓ .gitignoreを更新しました${NC}"
        fi
        
        echo -e "${GREEN}自動修正が完了しました${NC}"
    fi
else
    echo -e "${GREEN}すべての設定が正常です！${NC}"
fi

# 診断ログの保存
LOG_FILE="claude-debug.log"
{
    echo "Claude AI診断ログ - $(date)"
    echo "========================"
    echo ""
    echo "成功項目:"
    for item in "${SUCCESS[@]}"; do
        echo "  $item"
    done
    echo ""
    echo "警告項目:"
    for item in "${WARNINGS[@]}"; do
        echo "  $item"
    done
    echo ""
    echo "問題項目:"
    for item in "${ISSUES[@]}"; do
        echo "  $item"
    done
} > "$LOG_FILE"

echo ""
echo -e "${BLUE}診断ログを $LOG_FILE に保存しました${NC}" 
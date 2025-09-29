#!/usr/bin/env bash
set -e

BRANCH="feature/add-cambios-extrato"
git checkout -b "$BRANCH"

# criar estrutura e arquivos locais (AJUSTE os caminhos )
mkdir -p src/app/cambios src/app/extrato src/app/services src/environments

cat > src/environments/environment.ts <<'EOF'
export const environment = {
  production: false,
  apiBase: 'https://api.exemplo.com',
  exchangePath: '/exchange',
  transactionsPath: '/transactions'
};
EOF

# services
cat > src/app/services/exchange.service.ts <<'EOF'
// (conteúdo do exchange.service.ts — cole o arquivo de serviço aqui)
EOF

cat > src/app/services/transactions.service.ts <<'EOF'
// (conteúdo do transactions.service.ts — cole o arquivo de serviço aqui)
EOF

# componentes: cambíos
cat > src/app/cambios/cambios.component.ts <<'EOF'
// (conteúdo do cambios.component.ts)
EOF
cat > src/app/cambios/cambios.component.html <<'EOF'
<!-- (conteúdo html) -->
EOF
cat > src/app/cambios/cambios.component.scss <<'EOF'
/* (conteúdo scss) */
EOF

# componentes: extrato
cat > src/app/extrato/extrato.component.ts <<'EOF'
// (conteúdo do extrato.component.ts)
EOF
cat > src/app/extrato/extrato.component.html <<'EOF'
<!-- (conteúdo html) -->
EOF
cat > src/app/extrato/extrato.component.scss <<'EOF'
/* (conteúdo scss) */
EOF

git add .
git commit -m "feat: adiciona páginas Câmbios e Extrato + services (pré-configurados)"
git push --set-upstream origin "$BRANCH"

echo "Branch $BRANCH criada e push realizado. Abra um PR no GitHub."

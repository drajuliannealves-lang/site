# Dra. Julianne Alves — Site Profissional

Landing page profissional da **Dra. Julianne Alves**, enfermeira especialista em
**tratamento de feridas, ostomias e laserterapia**, com atendimento domiciliar em Goiás.

Site **estático, focado em SEO**, sem framework e sem etapa de build — apenas HTML, CSS e
JavaScript puro. Pode ser publicado em qualquer hospedagem estática.

🌐 Domínio: `https://drajuliannealves.com.br`

---

## Tecnologias

- **HTML5** semântico
- **CSS** com variáveis (design system "Botânica Clínica de Luxo")
- **JavaScript** vanilla (IIFE, sem dependências)
- **Web3Forms** para o formulário de contato (sem backend)
- **Google Fonts**: Amiri (títulos) + Alegreya Sans (corpo)

Sem npm, sem bundler, sem framework. Os arquivos são servidos como estão.

---

## Estrutura

```
.
├── index.html              # A página inteira (single-page)
├── css/styles.css          # Todos os estilos (design tokens em :root)
├── js/main.js              # Ano, menu mobile, formulário e carrossel
├── assets/
│   ├── images/             # Fotos da Dra. + logos (.jpg/.png)
│   └── icons/              # Favicons, ícones PWA e logo-fonte
├── favicon.ico
├── robots.txt              # SEO — permite tudo + aponta o sitemap
├── sitemap.xml             # SEO
├── site.webmanifest        # PWA / ícones
├── CLAUDE.md               # Guia de arquitetura e convenções
└── ROADMAP.md              # Pendências e próximos passos
```

Seções da página (âncoras): `#sobre` · `#atuacao` · `#servicos` · `#abordagem` · `#diferenciais` · `#missao` · `#faq` · `#contato`.

---

## Rodar localmente

O site usa caminhos absolutos (`/assets/...`) e `fetch` no formulário, então **sirva por HTTP**
(não abra o `index.html` via `file://`):

```bash
# opção 1 — Python
python3 -m http.server 8000

# opção 2 — Node
npx serve .
```

Depois acesse <http://localhost:8000>.

---

## Publicar (deploy)

Qualquer host estático funciona. Exemplos:

- **Vercel / Netlify / Cloudflare Pages**: conecte o repositório (ou arraste a pasta). Sem comando de build.
- **GitHub Pages**: publique o conteúdo da raiz.

Após publicar:

1. Aponte o domínio `drajuliannealves.com.br` (DNS).
2. Garanta **HTTPS** e o redirect **`www → drajuliannealves.com.br`** (o site usa o domínio sem `www`).
3. Verifique o site no **Google Search Console** e envie o `sitemap.xml`.

---

## Personalização rápida

| O que mudar | Onde |
|-------------|------|
| **Cores / espaçamento / sombras** | variáveis em `:root` no topo de `css/styles.css` |
| **Textos das seções** | `index.html` |
| **WhatsApp** | aparece em 3 lugares: botão flutuante, lista de contato e `telephone` no JSON-LD (`index.html`) |
| **Logo (header/rodapé)** | `assets/images/logo-monograma.png` e `logo-julianne.png` |
| **Favicons** | `assets/icons/` (ver pipeline no `CLAUDE.md`) |
| **Chave do formulário** | `access_key` em `index.html` (Web3Forms) |
| **Fotos** | `assets/images/` — biblioteca extra documentada no `CLAUDE.md` |

> ⚠️ Ao alterar o **número de WhatsApp**, atualize os **3 lugares** ao mesmo tempo. O mesmo vale
> para o **domínio** (canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`).

---

## SEO

- `title`, `meta description` e `H1` com palavra-chave principal + localização (Goiás)
- Dados estruturados: **MedicalBusiness + LocalBusiness** e **FAQPage** (JSON-LD)
- Open Graph / Twitter Cards completos, `canonical`, `robots.txt`, `sitemap.xml`
- Health Index atual: **89/100** — detalhes e próximos passos no `ROADMAP.md`

---

## Documentação

- **`CLAUDE.md`** — arquitetura, design system, pipeline de assets e convenções
- **`ROADMAP.md`** — pendências priorizadas e próximos passos

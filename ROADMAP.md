# Roadmap — Site Dra. Julianne Alves

Pendências e próximos passos do site. Marque `[x]` ao concluir.
Última atualização: 2026-06-09.

---

## ✅ Concluído

- [x] Landing page estática completa (HTML/CSS/JS, sem build)
- [x] Design "Botânica Clínica de Luxo" (esmeralda `#0D4440` · dourado `#BAA672` · creme `#F8F4E1`)
- [x] Tipografia Amiri + Alegreya Sans
- [x] Logo e favicons gerados a partir da arte oficial (`logo-monograma.png`, `favicon.ico`, ícones PWA, `og-image.jpg`)
- [x] Fotos profissionais reais (hero, sobre, carrossel)
- [x] Seções: Hero, Sobre, Frase em destaque, Serviços, Áreas de Atuação, Abordagem (carrossel), Diferenciais, Missão, FAQ, Contato
- [x] Carrossel imagem+texto acessível (setas, dots, teclado, swipe, autoplay)
- [x] Botão flutuante de WhatsApp
- [x] Formulário de contato funcional (Web3Forms — chave ativa)
- [x] Dados reais: WhatsApp `(62) 99425-3164`, e-mail, COREN-GO 274802, domínio `drajuliannealves.com.br`
- [x] SEO on-page: title/description/H1 com palavra-chave + geo
- [x] Structured Data: `MedicalBusiness` + `LocalBusiness` + `FAQPage`
- [x] Open Graph / Twitter Cards completos
- [x] `robots.txt`, `sitemap.xml` (com `lastmod`), `site.webmanifest`
- [x] Acessibilidade: skip link, labels, `aria-*`, `prefers-reduced-motion`
- [x] Nota LGPD no formulário

---

## 🔴 Alta prioridade

### Conteúdo / dados a confirmar
- [ ] **Confirmar a cidade-base** (ex.: Goiânia, Anápolis…). Hoje o geo está como **"Goiás" (estado)**.
      Ao confirmar, estreitar em 4 pontos: `<title>`, `meta description`, `geo.placename` e `areaServed` (JSON-LD).
- [ ] **Endereço de atendimento**: confirmar se é **somente domiciliar** (atual) ou se há consultório.
      Se houver consultório, adicionar `PostalAddress` completo + `geo` no JSON-LD.

### SEO local off-page (fora do site, mas essencial)
- [ ] **Criar o Google Business Profile** (Perfil da Empresa no Google) — alavanca nº 1 de SEO local.
      Categoria sugerida: "Enfermeiro(a)". Preencher serviços, área de atendimento, fotos, horário e WhatsApp.
- [ ] **Verificar o site no Google Search Console** e enviar o `sitemap.xml`.
- [ ] **Coletar e responder avaliações** (Google) — prova social + ranqueamento local.

### Deploy / publicação
- [ ] Publicar em hospedagem estática (Vercel / Netlify / Cloudflare Pages / GitHub Pages).
- [ ] Garantir **HTTPS** e redirect **`www → drajuliannealves.com.br`** (domínio sem `www`).
- [ ] Apontar o domínio `drajuliannealves.com.br` (DNS).

---

## 🟡 Média prioridade

- [ ] **Redes sociais**: criar/vincular Instagram e adicionar `sameAs` no JSON-LD (reforça E-E-A-T).
- [ ] **Página de Política de Privacidade** (LGPD) — o formulário coleta dados pessoais.
      Linkar no rodapé e na nota do formulário.
- [ ] **Depoimentos de pacientes** — nova seção + `Review`/`AggregateRating` no schema (prova social).
- [ ] **Analytics**: adicionar Google Analytics 4 (ou Plausible) + eventos de clique no WhatsApp/envio do form.
- [ ] **Foto clínica para a laserterapia**: o slide 03 do carrossel usa um retrato; o ideal é uma imagem do procedimento.
- [ ] **`og-image` alternativa**: avaliar usar uma foto da Dra. (hoje é o logotipo) para compartilhamentos mais "humanos".

---

## 🟢 Baixa prioridade / melhorias contínuas

- [ ] **Performance**: converter imagens para **WebP** (e `srcset`/`sizes`) — melhora o LCP.
- [ ] **Subset de fontes**: reduzir os pesos carregados do Google Fonts.
- [ ] **Página 404** personalizada (depende do host).
- [ ] **Pré-carregar** a fonte do título (Amiri) e/ou a imagem do hero.
- [ ] **Conteúdo / blog**: artigos sobre cuidados com feridas (SEO de cauda longa, autoridade no tema).
- [ ] Auditar **contraste de cor** (dourado sobre esmeralda em textos decorativos).
- [ ] Automatizar `lastmod` do `sitemap.xml` no deploy.

---

## 🔑 Placeholders restantes (técnicos)

Nenhum dado de contato pendente. Itens que dependem de decisão/cadastro externo:

| Item | Onde | Status |
|------|------|--------|
| Cidade exata (geo) | `index.html` (title, description, geo, JSON-LD) | usando "Goiás" |
| `sameAs` (redes sociais) | JSON-LD | não adicionado (sem perfis) |
| Política de Privacidade | rodapé + nota do form | a criar |

---

## Referências

- Arquitetura e convenções do código: **`CLAUDE.md`**
- Como rodar/publicar: **`README.md`**

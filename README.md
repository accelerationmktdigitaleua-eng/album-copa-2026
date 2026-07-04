# Álbum Copa 2026 🏆

App web pra controlar o álbum de figurinhas Panini da Copa do Mundo FIFA 2026.

**Live:** https://album.acceleration.com.br

## O que faz

- 994 figurinhas: 48 seleções × 20 + 20 FWC (foil) + 14 Coca-Cola
- Toque na figurinha: falta → tenho → repetida (pra troca)
- Fotos dos jogadores (Wikimedia Commons): P&B quando falta, colorida quando cola
- 🎆 Fogos de artifício ao completar uma seleção/seção
- Progresso por seleção, grupo e geral + relatório "o que falta" clicável
- Busca por jogador/seleção (ignora acentos)
- Lista de faltantes e lista de troca compartilháveis (WhatsApp)
- Backup: exportar/importar JSON (dados ficam no localStorage do navegador)
- 100% offline após a primeira visita (service worker; botão pra baixar todas as fotos)
- PWA: adicionar à tela de início no iPhone/iPad
- Visual estádio noturno + foil Panini, cores dos 3 países-sede, otimizado iOS/iPad/Chrome

## Stack

Um único `index.html` — HTML + CSS + JavaScript vanilla, zero dependências, zero build. Deploy estático (Vercel).

## Rodar local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Dados

Estrutura do álbum conforme checklist oficial Panini 2026. Elencos: CNN Brasil (abr/2026).
Os dados de coleção ficam só no navegador (chave `copa26v4` do localStorage) — use o backup antes de trocar de aparelho.

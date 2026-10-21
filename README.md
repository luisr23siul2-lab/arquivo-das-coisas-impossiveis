# O Arquivo das Coisas Impossíveis

Presente digital de aniversário: experiência curta de fantasia dark academia, responsiva para celular.

## Arquivos
- `index.html`: estrutura das cinco telas, diálogo dos documentos e conteúdo da carta.
- `style.css`: aparência visual, cores, fontes, layout responsivo e animações.
- `script.js`: navegação, leitura dos documentos, progresso e enigma.

## Personalização rápida antes de enviar
Abra `script.js` e personalize:
1. Substitua `[NOME DO SEU AMIGO]` no documento `individual`.
2. Ajuste as três pistas para terem referências que façam sentido para vocês.
3. Edite o texto da carta final diretamente em `index.html`, na seção `screen-letter`.
4. Se quiser, altere “O responsável por este arquivo” para sua assinatura ou apelido.
5. Teste a senha `VINCULO` (aceita também `vínculo`).

**Privacidade:** este é um site estático. A senha é uma mecânica de jogo, não uma proteção real; o código-fonte pode ser inspecionado. Não inclua dados privados ou sensíveis.

## Testar no computador
Deixe os três arquivos na mesma pasta e abra `index.html` no navegador. Para testar publicação e carregamento de fontes externas, use a prévia hospedada.

## Publicar grátis com GitHub Pages
1. Entre em https://github.com/ e crie uma conta ou faça login.
2. Crie um repositório novo, por exemplo `arquivo-de-vespera`.
3. Envie `index.html`, `style.css` e `script.js` para a raiz do repositório.
4. Abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**.
6. Selecione a branch `main` e a pasta `/ (root)`; salve.
7. Aguarde a publicação e abra a URL que o GitHub Pages mostrar nessa tela.
8. Teste a URL no celular, em uma janela anônima, antes de enviar.

## Alternativa: Netlify
1. Entre em https://www.netlify.com/ e faça login.
2. Abra a opção de adicionar um site e escolha o deploy manual, se disponível na interface.
3. Arraste a pasta que contém os três arquivos para a área de deploy.
4. Abra a URL gerada e teste no celular.

As interfaces dos serviços podem mudar; siga as opções equivalentes de publicação de site estático.

## Lista de verificação
- [ ] Substituí o nome de exemplo.
- [ ] Personalizei ao menos uma piada ou referência interna.
- [ ] Li a carta final em voz alta e ela soa como eu.
- [ ] Testei todas as três pastas.
- [ ] Testei uma senha errada e a senha correta.
- [ ] Testei a navegação em uma tela estreita.
- [ ] Abri o link publicado em outro navegador/dispositivo.


## Fragmentos e ambientação

- Personalize o nome no início de `script.js`, na constante `friendName`.
- Os botões “Examinar fragmento” estão dentro dos textos dos três documentos, no objeto `documents` do `script.js`.
- O progresso de fragmentos é temporário: reiniciar a investigação limpa os fragmentos encontrados.
- O painel Ambientação está preparado para dois arquivos de áudio opcionais: `sounds/fire.mp3` e `sounds/rain.mp3`. Crie uma pasta `sounds` no repositório e envie seus próprios arquivos de áudio com esses nomes. Os dois volumes podem ser ajustados separadamente.
- Cada fragmento tem um espaço reservado para uma imagem. Quando escolher as imagens, você pode substituir o espaço reservado por uma tag `<img>` e usar um caminho como `images/fragmento-vx01.jpg`.

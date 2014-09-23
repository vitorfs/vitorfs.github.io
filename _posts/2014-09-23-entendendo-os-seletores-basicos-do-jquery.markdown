---
layout: post
title:  Entendendo os Seletores Básicos do jQuery
description: Entenda como trabalhar com os seletores básicos do jQuery.
date:   2014-09-23 15:15:05
categories: blog
tags: jquery
---

## Introdução

Costumo dizer que quem domina os seletores do jQuery domina o jQuery. Saber selecionar o elemento que você deseja adicionar um determinado comportamento é meio caminho andado para solução do seu problema. Neste artigo vamos explorar por meio de alguns exemplos os seletores do jQuery.

Todo seletor retorna uma lista de elementos, com exceção do seletor por **id**, que retorna somente um elemento. Em um mesmo documento HTML é possível ter mais de um elemento com o mesmo **id**, mas semanticamente é incorreto, e no geral você não deveria fazer isso. A não ser que tenha um bom motivo para tal. Mas em 99,9% dos casos existem formas mais corretas de se resolver o problema.

O objetivo deste artigo é dar uma introdução sobre os seletores jQuery. Em um próximo artigo irei abordar os seletores avançados.

Os seletores do jQuery possui o seguinte formato:

{% highlight javascript %}
$("elemento");
{% endhighlight %}

ou

{% highlight javascript %}
jQuery("elemento");
{% endhighlight %}

Neste artigo usaremos a primeira notação. Para trabalhar com jQuery tudo começa por aí. A partir da seleção do elemento, você trabalha seu comportamento.

{% highlight javascript %}
$("elemento").fadeOut();
{% endhighlight %}

{% highlight javascript %}
$("elemento").click(function () {
  alert("Um evento de click associado à este elemento!");
});
{% endhighlight %}

Para exemplificar, vamos considerar a estrutura HTML a seguir:

{% highlight html %}
<div id="content">
  <h2 class="left">Characters</h2>
  <p>The Endless are a family of seven anthropomorphic personifications of...</p>
  <div id="destiny" class="character">
    <img src="imgs/characters/destiny.png" class="right">
    <h3>Destiny</h3>
    <p>In The Sandman, Destiny is revealed in issue #7 as the eldest of the...</p>
  </div>
  <div id="death" class="character">
    <img src="imgs/characters/death.png" class="left">
    <h3>Death</h3>
    <p>Death is the second eldest of the Endless, a family of anthropomorphic...</p>
  </div>
</div>
{% endhighlight %}

## Seletor de Tag

Este é o seletor mais simples, basta passar o nome da tag que deseja selecionar.

### jQuery

{% highlight javascript %}
$("div");
{% endhighlight %}

### Resultado

{% highlight html %}
[<div id="content">, <div id="destiny" class="character">, 
 <div id="death" class="character">]
{% endhighlight %}

***

### jQuery

{% highlight javascript %}
$("h3");
{% endhighlight %}

### Resultado

{% highlight html %}
[<h3>Destiny</h3>, <h3>Death</h3>]
{% endhighlight %}

## Seletor de ID

O jQuery utiliza a notação emprestada do CSS. Se você já está familiarizado com as notações de classes e IDs do CSS, será bem mais fácil abstrair os conceitos.

### jQuery

{% highlight javascript %}
$("#content");
{% endhighlight %}

### Resultado

{% highlight html %}
[<div id="content">]
{% endhighlight %}

***

Igualmente correto:

### jQuery

{% highlight javascript %}
$("div#content");
{% endhighlight %}

### Resultado

{% highlight html %}
[<div id="content">]
{% endhighlight %}

***

### jQuery

{% highlight javascript %}
$("span#content");
{% endhighlight %}

### Resultado

{% highlight html %}
[]
{% endhighlight %}

Neste caso nenhum resultado foi retornado pois limitamos o seletor a selecionar um elemento do tipo **span** com **id** igual a **content**.

## Seletor de Classe

### jQuery

{% highlight javascript %}
$(".character");
{% endhighlight %}

### Resultado

{% highlight html %}
[<div id="destiny" class="character">, <div id="death" class="character">]
{% endhighlight %}

***

### jQuery

{% highlight javascript %}
$(".left");
{% endhighlight %}

### Resultado

{% highlight html %}
[<h2 class="left">Characters</h2>, <img src="imgs/characters/death.png" class="left">]
{% endhighlight %}

***

### jQuery

{% highlight javascript %}
$("h2.left");
{% endhighlight %}

### Resultado

{% highlight html %}
[<h2 class="left">Characters</h2>]
{% endhighlight %}

Todos elementos **h2** com classe **left**.

***

### jQuery

{% highlight javascript %}
$("h2 .left");
{% endhighlight %}

### Resultado

{% highlight html %}
[]
{% endhighlight %}

Neste último caso o seletor não retornou nenhum resultado pois o espaço dentre **h2** e **.left** quer dizer que estamos selecionando um elemento com classe **left** dentro de um elemento **h2**.

## Especificidade dos Seletores

A especificidade do seletor funciona da mesma maneira do CSS. Separando os seletores com espaços indica um caminhamento na estrutura hierárquica do HTML.

### jQuery

{% highlight javascript %}
$("div img");
{% endhighlight %}

### Resultado

{% highlight html %}
[<img src="imgs/characters/destiny.png" class="right">, 
 <img src="imgs/characters/death.png" class="left">]
{% endhighlight %}

A leitura deste seletor é a seguinte: Selecione todos elementos **img** que estejam dentro de um elemento **div**.

***

### jQuery

{% highlight javascript %}
$("div#destiny img");
{% endhighlight %}

### Resultado

{% highlight html %}
[<img src="imgs/characters/destiny.png" class="right">]
{% endhighlight %}

A leitura deste seletor fica um pouco mais específica: Selecione todos elementos **img** dentro de um elemento **div** com **id** igual a **destiny**.

****

### jQuery

{% highlight javascript %}
$("div#content div#destiny img.right");
{% endhighlight %}

### Resultado

{% highlight html %}
[<img src="imgs/characters/destiny.png" class="right">]
{% endhighlight %}

***

### jQuery

{% highlight javascript %}
$("div p div img");
{% endhighlight %}

### Resultado

{% highlight html %}
[]
{% endhighlight %}

## Seletores Múltiplos

Para selecionar mais de um elemento, basta separar os elementos por vírgula.

### jQuery

{% highlight javascript %}
$("h2, h3");
{% endhighlight %}

### Resultado

{% highlight html %}
[<h2 class="left">Characters</h2>, 
 <h3>Destiny</h3>,
 <h3>Death</h3>]
{% endhighlight %}

Todas as outras regras anteriores se aplicam para os seletores múltiplos.
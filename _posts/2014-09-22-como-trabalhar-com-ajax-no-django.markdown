---
layout: post
title:  Como Trabalhar Com Ajax No Django
date:   2014-09-22 16:12:00
categories: blog
tags: django python jquery
---

## Introdução

Ajax é um poderoso recurso no desenvolvimento web que nos permite realizar requisições assíncronas no servidor de aplicação, possibilitando o desenvolvimento de aplicações mais rápidas e robustas, além de melhorar a experiência dos usuários.

Para trabalhar com Ajax precisamos somente de JavaScript, o que quer dizer que podemos utilizar essa estratégia em conjunto com qualquer linguagem de programação para web (PHP, C#, Ruby, Python, etc). O que difere é a maneira como tratamos as requisições no lado do servidor, de resto, a essência continua a mesma. Em alguns _frameworks_ de desenvolvimento web _component-based_ pode ser um pouco mais trabalhoso, o que não é o caso do Django.

Uma implementação feita puramente em JavaScript costuma ser um pouco mais complicada. Alguns _frameworks_ como jQuery abstraem a complexidade da implementação. Neste artigo trabalharemos com o jQuery para simplificar o processo. O que normalmente é uma boa ideia, pois nos permite focar no que realmente é importante além de minimizar possíveis erros.

## Preparando o Ambiente

Particularmente, eu aprendo melhor com exemplos e olhando _code snippets_. Evidente que, existem diversos detalhes de implementação quando falamos de Ajax, mas vamos tentar manter as coisas simples inicialmente.

Neste tutorial vou utilizar os seguintes recursos:

* [Python 2.7.6][python]
* [Django 1.6.6][django]
* [jQuery 2.1.1][jquery]

Vamos utilizar a biblioteca do jQuery hospedada no [Google Hosted Libraries][google-hosted-libraries]. 

Criei um novo projeto [Django][django] e incluí as dependências necessárias. Para este exemplo criei um layout base, uma app chamada **core** e defini uma rota para a **home** do projeto.

![Estrutura Básica do Projeto](/assets/images/2014-09-22-como-trabalhar-com-ajax-no-django/01.png "Estrutura Básico do Projeto")

Para os exemplos de implementação a seguir vou manter os _scripts_ no mesmo HTML do _template_, mas nada impede de você colocá-los em um arquivo _.js_ separado.

## Caso de Uso - Filtrar Cidades a Partir do Estado Selecionado

Este é um caso de uso comum de _dropdown list_ em cascata, ou seja, quando o resultado de uma depende do resultado da anterior. Isso se aplica a diversos casos em aplicações administrativas.

### core/templates/core/home.html

{% highlight html %}
{% raw %}
{% extends 'base.html' %}

{% block main %}
{% endraw %}
  <form>
    <div>
      <label for="estado">Estado</label>
      <select name="estado" id="estado">
        <option value="">Selecione...</option>
        <option value="MG">Minas Gerais</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="SP">São Paulo</option>
      </select>
    </div>
    <div>
      <label for="cidade">Cidade</label>
      <select name="cidade" id="cidade">
        <option value="">Selecione...</option>
      </select>
    </div>
  </form>
{% raw %}
{% endblock main %}
{% endraw %}
{% endhighlight %}

Com isso já temos nosso HTML do template pronto para trabalhar. O mais correto agora seria preparar o _backend_ com classes de modelo, para ter uma entidade para Estado e outra para Cidade e alimentar esses valores em um banco de dados. Mas por enquanto vamos abstrair essa complexidade, e fazer um código estático.

### urls.py

{% highlight python %}
from django.conf.urls import patterns, include, url

urlpatterns = patterns('django_ajax_example.core.views',
    url(r'^$', 'home', name='home'),
    url(r'^filtrar_cidade/$', 'filtrar_cidade', name='filtrar_cidade'),
)
{% endhighlight %}

### core/views.py

{% highlight python %}
# coding: utf-8

from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request, 'core/home.html')

def filtrar_cidade(request):
  mg = [[1, u'Juiz de Fora'], [2, u'Belo Horizonte'], [3, u'Ouro Preto']]
  rj = [[4, u'Rio de Janeiro'], [5, u'Cabo Frio'], [6, u'Búzios']]
  sp = [[7, u'São Paulo'], [8, u'Barueri'], [9, u'Campinas']]
  
  estado = request.GET.get('estado')

  html = u'<option value="">Selecione...</option>'

  if estado == 'MG':
    for cidade in mg:
      html = u'{0}<option value="{1}">{2}</option>'.format(html, cidade[0], cidade[1])

  elif estado == 'RJ':
    for cidade in rj:
      html = u'{0}<option value="{1}">{2}</option>'.format(html, cidade[0], cidade[1])

  elif estado == 'SP':
    for cidade in sp:
      html = u'{0}<option value="{1}">{2}</option>'.format(html, cidade[0], cidade[1])

  return HttpResponse(html)
{% endhighlight %}

Até aqui criamos uma rota no arquivo **urls.py** e um método para processar as requisições feitas à url **/filtrar_cidade/**. Este método espera um parâmetro chamado **estado** que será passado via **GET**, com o código do estado. Dependendo do estado informado, o código retorna as cidades referentes à este código.

Note que o método **filtrar_cidade** retorna um **HttpResponse**, recebendo uma _string_ como parâmetro. Esta _string_ será todo corpo do _response_. Como queremos alterar somente o conteúdo da _dropdown list_ de cidades, não precisamos retornar um documento HTML completo, como retornamos no **home**.

Vamos alterar agora o **home.html** adicionando os _scripts_ necessários para realizar a requisição Ajax.

{% highlight html %}
{% raw %}
{% extends 'base.html' %}

{% block main %}
{% endraw %}
  <form>
    <div>
      <label for="estado">Estado</label>
      <select name="estado" id="estado">
        <option value="">Selecione...</option>
        <option value="MG">Minas Gerais</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="SP">São Paulo</option>
      </select>
    </div>
    <div>
      <label for="cidade">Cidade</label>
      <select name="cidade" id="cidade">
        <option value="">Selecione...</option>
      </select>
    </div>
  </form>

  <script>
    $(function () {                     // Aguarda a página carregar
      $("#estado").change(function () { // Associa uma função ao evento de change
        var estado = $(this).val();     // Armazena o estado selecionado
        $.ajax({                        // Inicia a definição da requisição
          url: '/filtrar_cidade/',      // Define a url da requisição
          data: {                       // Definição dos dados que serão enviados
            'estado': estado            // Adiciona dados a serem enviados
          },                            
          success: function (data) {    // Método de sucesso da requisição
            $("#cidade").html(data);    // Alimenta a dropdown list #cidades
          }
        });
      });
    });
  </script>
{% raw %}
{% endblock main %}
{% endraw %}
{% endhighlight %}

O conceito aqui é bem simples. Uma função é associada ao evento de _change_ do elemento **#estado**. Toda vez que o valor de **#estado** mudar esta função será executada. Esta função é composta por uma requisição **ajax**, que definimos uma url e os parâmetros GET. Toda lógica de processamento é definida no _backend_, portanto basta alterar este método para realizar a tarefa que for necessária. A função que associamos ao **success** da requisição será executada somente se esta requisição retornar com sucesso (normalmente _status_ 200).

Existem diversas outras configurações que podem ser adicionadas às requisições. Vocês podem ler mais na [documentação oficial do jQuery][jquery-ajax].

O projeto Django utilizado neste artigo está disponível no GitHub neste [link][post-code-snippet].

[python]: http://python.org "Python"
[django]: http://djangoproject.com "Django"
[jquery]: http://jquery.com "jQuery"
[google-hosted-libraries]: https://developers.google.com/speed/libraries/devguide#jquery "Google Hosted Libraries"
[jquery-ajax]: http://api.jquery.com/jQuery.ajax/ "jQuery.ajax"
[post-code-snippet]: https://github.com/vitorfs/blog-code-snippets/tree/master/2014-09-22-como-trabalhar-com-ajax-no-django "Code Snippet"
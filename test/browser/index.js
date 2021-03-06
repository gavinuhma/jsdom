exports.tests = {

  notfound_getelementsbyclassname : function() {

      var doc = new browser.Document();

      var html = doc.createElement("html");
      doc.appendChild(html);

      var body = doc.createElement("body");
      html.appendChild(body);

      var p = doc.createElement("p");
      p.className = "unknown";
      body.appendChild(p);

      var elements = doc.getElementsByClassName("first-p");
      assertEquals("no results", 0, elements.length);
  },


  basic_getelementsbyclassname : function() {

      var doc = new browser.Document();

      var html = doc.createElement("html");
      doc.appendChild(html);

      var body = doc.createElement("body");
      html.appendChild(body);

      var p = doc.createElement("p");
      p.className = "first-p";
      body.appendChild(p);

      var elements = doc.getElementsByClassName("first-p");
      assertSame("p and first-p", p, elements.item(0));
  },

  multiple_getelementsbyclassname : function() {

      var doc = new browser.Document();

      var html = doc.createElement("html");
      doc.appendChild(html);

      var body = doc.createElement("body");
      html.appendChild(body);

      var p = doc.createElement("p");
      p.className = "first-p second third";
      body.appendChild(p);

      var first = doc.getElementsByClassName("first-p");
      assertSame("p and first-p", p, first.item(0));

      var second = doc.getElementsByClassName("second");
      assertSame("p and second", p, second.item(0));

      var third = doc.getElementsByClassName("third");
      assertSame("p and third", p, third.item(0));
  },

  testclassnameworksasexpected : function() {
      var doc = new browser.Document();
      var p = doc.createElement("p");
      p.setAttribute("class", "first-p");
      assertSame("class attribute is same as className", p.className,"first-p");

      p.className += " second";
      assertSame("className getter/setter", p.className,"first-p second");
  },

  basic_getelementbyid : function() {

      var doc = new browser.Document();

      var html = doc.createElement("html");
      doc.appendChild(html);

      var body = doc.createElement("body");
      html.appendChild(body);

      var p = doc.createElement("p");
      p.id = "theid";
      body.appendChild(p);

      var element = doc.getElementById("theid");
      assertSame("p and #theid", p, element);
  },
  nonexistant_getelementbyid : function() {

      var doc = new browser.Document();

      var html = doc.createElement("html");
      doc.appendChild(html);

      var body = doc.createElement("body");
      html.appendChild(body);

      var p = doc.createElement("p");
      p.id = "theid";
      body.appendChild(p);

      var element = doc.getElementById("non-existant-id");
      assertSame("p and #theid", null, element);
  },
  remove_nonexistantattribute : function() {
      var doc = new browser.Document();

      var html = doc.createElement("html");
      doc.appendChild(html);

      var body = doc.createElement("body");
      html.appendChild(body);

      exception = false;
      try {
        removedNode = body.removeAttribute("non-existant");
      }
      catch(ex) {
        exception = true;
      }
      assertFalse("setValue_throws_NO_MODIFICATION_ERR", exception);
  },
  render_singletag : function() {
      var doc = new browser.Document();

      var p = doc.createElement("p");

      var img = doc.createElement("img");
      p.appendChild(img);
      var out = p.outerHTML;
      assertNull("end tag not included in output", out.match(/<\/img>/));
  },
  parse_scripttags : function() {
    var doc = new browser.Document();

    var head = doc.createElement("head");
    var scriptHtml = '<script>alert("hello world")</script>';
    head.innerHTML = scriptHtml;

    assertEquals("original and processed", head.innerHTML, scriptHtml);

  },
  parse_styletags : function() {
    var doc = new browser.Document();

    var head = doc.createElement("head");
    var styleHtml = '<style>body: {color: #fff;}</style>';
    head.innerHTML = styleHtml;

    assertEquals("original and processed", head.innerHTML, styleHtml);

  },
  parse_doublespacetags : function() {
    var doc = new browser.Document();

    var html = '<html><body  class="testing" /></html>';

    exception = false;
    try {
      doc.innerHTML = html;
    }
    catch(ex) {
      exception = true;
    }
    assertFalse("setValue_throws_INVALID_CHARACTER_ERR", exception);
  },
  serialize_styleattribute : function() {
    var doc = new browser.Document();
    doc.appendChild(doc.createElement('html'));
    doc.documentElement.style.color = 'black';
    doc.documentElement.style.backgroundColor = 'white';
    assertEquals('',
              '<html style="color: black; background-color: white"></html>\r\n',
              require('../../lib/jsdom/browser/domtohtml').domToHtml(doc));
  },
  innerhtml_removeallchildren: function() {
    var doc = new browser.HTMLDocument();
    doc.write('<html><body><p></p><p></p></body></html>');
    doc.body.innerHTML = '';
    assertTrue('still has children', doc.body.childNodes.length == 0);
  }
};

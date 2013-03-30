var the = {
    use_codemirror: ( ! window.location.href.match(/without-codemirror/)),
    beautify_in_progress: false,
    editor: null // codemirror editor
};

function run_tests() {
    var st = new SanityTest();
    run_beautifier_tests(st, Urlencoded, js_beautify);
    JavascriptObfuscator.run_tests(st);
    P_A_C_K_E_R.run_tests(st);
    Urlencoded.run_tests(st);
    MyObfuscate.run_tests(st);
    // $('#testresults').html(results.replace(/r/g, '').replace(/\n/g, '<br>'));
    var results = st.results_raw().replace(/ /g, '&nbsp;').replace(/\r/g, '·').replace(/\n/g, '<br>');
    $('#testresults').html(results).show();
}


function any(a, b) {
    return a || b;
}

function read_settings_from_cookie() {
    $('#tabsize').val(any($.cookie('tabsize'), '4'));
    $('#brace-style').val(any($.cookie('brace-style'), 'collapse'));
    $('#detect-packers').attr('checked', $.cookie('detect-packers') !== 'off');
    $('#preserve-newlines').attr('checked', $.cookie('preserve-newlines') !== 'off');
    $('#keep-array-indentation').attr('checked', $.cookie('keep-array-indentation') === 'on');
    $('#break-chained-methods').attr('checked', $.cookie('break-chained-methods') === 'on');
    $('#indent-scripts').val(any($.cookie('indent-scripts'), 'normal'));
    $('#space-before-conditional').attr('checked', $.cookie('space-before-conditional') !== 'off');
    $('#wrap-line-length').val(any($.cookie('wrap-line-length'), '0'));
    $('#unescape-strings').attr('checked', $.cookie('unescape-strings') === 'on');
}

function store_settings_to_cookie() {
    var opts = { expires: 360 };
    $.cookie('tabsize', $('#tabsize').val(), opts);
    $.cookie('brace-style', $('#brace-style').val(), opts);
    $.cookie('detect-packers', $('#detect-packers').attr('checked') ? 'on' : 'off', opts);
    $.cookie('preserve-newlines', $('#preserve-newlines').attr('checked') ? 'on' : 'off', opts);
    $.cookie('keep-array-indentation', $('#keep-array-indentation').attr('checked') ? 'on' : 'off', opts);
    $.cookie('break-chained-methods', $('#break-chained-methods').attr('checked') ? 'on' : 'off', opts);
    $.cookie('space-before-conditional', $('#space-before-conditional').attr('checked') ? 'on' : 'off', opts);
    $.cookie('unescape-strings', $('#unescape-strings').attr('checked') ? 'on' : 'off', opts);
    $.cookie('wrap-line-length', $('#wrap-line-length').val(), opts);
    $.cookie('indent-scripts', $('#indent-scripts').val(), opts);
}

function unpacker_filter(source) {
    var trailing_comments = '',
        comment = '',
        unpacked = '',
        found = false;

    // cut trailing comments
    do {
        found = false;
        if (/^\s*\/\*/.test(source)) {
            found = true;
            comment = source.substr(0, source.indexOf('*/') + 2);
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        } else if (/^\s*\/\//.test(source)) {
            found = true;
            comment = source.match(/^\s*\/\/.*/)[0];
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        }
    } while (found);

    var unpackers = [P_A_C_K_E_R, Urlencoded, JavascriptObfuscator, MyObfuscate];
    for (var i = 0; i < unpackers.length; i++) {
        if (unpackers[i].detect(source)) {
            unpacked = unpackers[i].unpack(source);
            if (unpacked != source) {
                source = unpacker_filter(unpacked);
            }
        }
    }

    return trailing_comments + source;
}


function beautify()
{
    if (the.beautify_in_progress) return;

    store_settings_to_cookie();

    the.beautify_in_progress = true;

    var source = the.editor ? the.editor.getValue() : $('#source').val(),
        output,
        opts = {};

    opts.indent_size = $('#tabsize').val();
    opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
    opts.preserve_newlines = $('#preserve-newlines').attr('checked');
    opts.keep_array_indentation = $('#keep-array-indentation').attr('checked');
    opts.break_chained_methods = $('#break-chained-methods').attr('checked');
    opts.indent_scripts = $('#indent-scripts').val();
    opts.brace_style = $('#brace-style').val();
    opts.space_before_conditional = $('#space-before-conditional').attr('checked');
    opts.unescape_strings = $('#unescape-strings').attr('checked');
    opts.wrap_line_length = $('#wrap-line-length').val();
    opts.space_after_anon_function = true;

    if (looks_like_html(source)) {
        output = style_html(source, opts);
    } else {
        if ($('#detect-packers').attr('checked')) {
            source = unpacker_filter(source);
        }
        output = js_beautify(source, opts);
    }
    if (the.editor) {
        the.editor.setValue(output);
    } else {
        $('#source').val(output);
    }

    the.beautify_in_progress = false;
}

function looks_like_html(source)
{
    // <foo> - looks like html
    // <!--\nalert('foo!');\n--> - doesn't look like html

    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}

$(function() {

    read_settings_from_cookie();

    var default_text = "// This is just a sample script. Paste your real code (javascript or HTML) here.\n\nif ('this_is'==/an_example/){of_beautifer();}else{var a=b?(c%d):e[f];}";

    if (the.use_codemirror && typeof CodeMirror !== 'undefined') {
        the.editor = CodeMirror.fromTextArea($('#source').get(0))
        the.editor.setValue(default_text);
        $('.CodeMirror').click(function () {
            if (the.editor.getValue() == default_text) {
                the.editor.setValue('');
            }
        });
    } else {
        $('#source').val(default_text).bind('click focus', function () {
            if ($(this).val() == default_text) {
                $(this).val('');
            }
        }).bind('blur', function () {
            if ( ! $(this).val()) {
                $(this).val(default_text);
            }
        });
    }


    $(window).bind('keydown', function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            beautify();
        }
    })
    $('#submit').click(beautify);
    $('select').change(beautify);


});
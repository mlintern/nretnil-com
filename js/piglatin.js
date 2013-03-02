// All global variables and constants are declared here

gcsVOWELS = "AEIOUaeiou";     // Standard English vowels
gcsVOWELSY = "AEIOUaeiouYy";  // Sometimes "Y" and "W", but only "Y" here
gcsWAY = "way";               // Vowel word suffix
gcsAY = "ay";                 // Consonant word suffix
gciMAXLINE = 65;              // Maximum line length of translated text (default)


function fVerifyEntry (piValue) {

   if (isNaN (parseInt (piValue))) {  // If value is Not A Number
      document.frmTranslator.txtMaxLength.value = gciMAXLINE;  // Set to default/optimal
      piValue = gciMAXLINE;  //  …line length (your mileage may vary) & fix parameter
   }

   if (piValue < 30)  // If value is less than 30
      document.frmTranslator.txtMaxLength.value = 30;  // 30 is minimum length

   if (piValue > 75)  // If value is greater than 75
      document.frmTranslator.txtMaxLength.value = 75;  // 75 is maximum length

   return;

}  // fVerifyEntry


function fClearText () {

   document.frmTranslator.taEng.value = "";  // Clear English text area
   document.frmTranslator.taEng.focus();  // Make English TextArea active

   return;

}  // fClearText


function fSelectText (pTA)
{
   eval ("document.frmTranslator." + pTA + ".focus()");  // Make TextArea active
   eval ("document.frmTranslator." + pTA + ".select();");  // Make TextArea text selected/highlighted

   return;
}  // fSelectText


function fTranslate () {

// Translate text from English to Pig Latin, line by line, word by word

   var sText;        // Text loaded from Text Area Form item
   var sPigLatin;    // Pig Latin translation result
   var sLine;        // Line by line translation for multiple lines (text area)
   var sWord;        // Current word being built & xlated (or separator)
   var bWord;        // Word/Separator mode flag
   var sChar;        // Current character from text being xlated
   var sNewline;     // New line character based on system requirements
   var iMaxLength;   // Maximum Line Length
   var bLearnMode;   // Learning Mode flag


   if (navigator.appVersion.lastIndexOf ("Win") != -1)  // System type?
      sNewline = "\r\n";  // Windows uses this for New Line

   else
      sNewline = "\n";  // Other systems use this for New Line (Mac, etc.)

   sText = document.frmTranslator.taEng.value;  // Get text to xlate
   iMaxLength = document.frmTranslator.txtMaxLength.value;
   bLearnMode = document.frmTranslator.learnmode.checked;

   sPigLatin = "";  // End result stored here
   sLine = "";      // Clear line text
   sWord = "";      // Clear word text
   bWord = true;    // We start off working on a real word

   for (var iChar = 0; iChar <= sText.length; ++iChar) {

      // The null at the end of the text signals final end of text/word

      sChar = sText.charAt (iChar);  // Get the next character

      if ((sChar >= "A" && sChar <= "Z") ||
            (sChar >= "a" && sChar <= "z") ||
            (sChar == "'" && bWord && sWord != "")) {  // If alphabetic character

         if (!bWord) {  // If last not a word, then must be non-word/separator
            if (sLine.length + sWord.length >= iMaxLength) {  // Check line length
               sPigLatin += sLine + sNewline;  // Line too long, end of line
               sLine = "";  // Clear line text
            }

            sLine += sWord;  // Append punctuation & whitespace to line
            sWord = "";  // Clear word text
            bWord = true;  // We're working on a real word
         }

         sWord += sChar;  // Append alpha character to word

      } else {  // A non-alpha character
         if (bWord && sWord != "") {  // If word mode and a word was found
            sWord = fPigLatin (sWord, bLearnMode);  // Translate word to Pig Latin

            if (sLine.length + sWord.length >= iMaxLength) {  // Check line length
               sPigLatin += sLine + sNewline;  // Line too long, end of line
               sLine = "";  // Clear line text
            }

            sLine += sWord;  // Append translated word to line
            sWord = "";  // Clear word text
         }

         sWord += sChar;  // Build punctuation, symbol & whitespace "word"
         bWord = false;  // Switch to non-word/separator mode

         if (sChar == "\r" || sChar == "\n") {  // If end of line
            sPigLatin += sLine + sWord;  // Append line and word to result
            sLine = "";  // Clear line text
            sWord = "";  // Clear word text
         }
      }

   }  // for

   sPigLatin += sLine + sWord;  // Append final line and word to result

   document.frmTranslator.taPL.value = sPigLatin;  // Store result

   fSelectText ("taEng");

}  // fTranslate


function fPigLatin (psWord, pbLearnMode) {

// Translate a word from English to Pig Latin -- word is in parameter #1

   var sWord;        // Word to translate from parameter #1
   var sFirst;       // First character of word
   var sSuffix;      // Pig Latin suffix text
   var sLast;        // Last character of word (used differently below)
   var bCapitalize;  // Word capitalization flag
   var bCapsFlag;    // Suffix capitalization flag


   sWord = psWord;  // Move to local storage
   sFirst = sWord.charAt (0);  // First character of word
   bCapitalize = (sFirst == sFirst.toUpperCase()) ? true : false;  // Capitalization flag
   sSuffix = "";

   if (gcsVOWELS.indexOf (sFirst) >= 0) {  // Word starts with a vowel?
      sSuffix = gcsWAY;  // Suffix is "way"
      sLast = sWord.charAt (sWord.length - 1);  // Get last char of word

      if (sLast == sLast.toUpperCase() && sWord.length > 1)  // If last char of word is uppercase (except "I")
         sSuffix = gcsWAY.toUpperCase();  // Make suffix uppercase to match

      // At this point, the word is translated correctly

   } else {  // Word starts with consonant(s) -- more complex processing required

      // Move all consonants at front of word to the end and add "ay"

      if (sWord != sWord.toUpperCase())  // If not all caps
         sFirst = sFirst.toLowerCase();  // Format for display

      iChars = sWord.length;  // Only process n characters

      while (iChars--) {  // For typos and any possible all-consonant "words"

        sSuffix += sFirst;  // Build suffix with leading consonants
        sLast = sFirst;  // Save last character (for "qu" testing)

        bCapsFlag = (sFirst == sFirst.toUpperCase()) ? true : false;  // Capitalize flag

        sWord = sWord.substring (1, sWord.length);  // Remove first/next char of word
        sFirst = sWord.charAt (0);  // Get next/first char of new word

        if (gcsVOWELSY.indexOf (sFirst) >= 0) {  // Vowel signals end
           if (!((sLast == "q" || sLast == "Q") &&
                 (sFirst == "u" || sFirst == "U")))  // Check for "qu"
              break;  // Quit loop if we hit a vowel or "y" (unless "qu")
        }

      }  // while

      if (bCapsFlag)  // If the first char of the new word is capitalized
         sSuffix += gcsAY.toUpperCase();  // Append "AY"

      else
         sSuffix += gcsAY;  // Append "ay"
   }

   sWord += (pbLearnMode ? "-" : "") + sSuffix;  // Put final translated word together

   if (bCapitalize) {  // If original word was capitalized…
      sFirst = sWord.charAt (0);  // …ensure translated word is too
      sWord = sFirst.toUpperCase() + sWord.substring (1, sWord.length);
   }

   return sWord;  // Return Pig Latin word

}  // fPigLatin
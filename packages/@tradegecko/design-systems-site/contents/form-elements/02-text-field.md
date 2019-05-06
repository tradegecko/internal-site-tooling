# Text field / Inputs

Text filed or input field is a single-line field, frequently appear in forms, for the following 3 purposes whereby:


- Users need to view data
- Users need to enter information
- Users need to search for key terms
    
## Usage

There are five elements of text fields:

1. Labels for text fields
2. Required/Optional indicators
3. Validation
4. Placeholder text
5. Masked data (For payments & password field)


## Labels for text fields

To make sure our text fields are accessible to all users, text labels are required for input items. Use clear, concise, consistent labels to guide the user. If the subject is complicated, find words to make it simpler. Each label is left-justified and appears above the field it describes.


![Labels for text fields](https://paper-attachments.dropbox.com/s_327408233EFF4365077EC98096B4D9BA485ACC65ED94F58C460043E10CA47BDC_1554428169684_image.png)




## Required/Optional indicators

Required indicators signify to the users so that they know if a field is required with the asterisk (*) to the right of the field label. If it’s a field is optional, there is no asterisk so there is a clear separation.

If a field is strongly recommended (but perhaps not strictly “required”) it should be as near to the beginning of the form as possible. This reduces the chance of a user skipping it.


## We highlight the minority
- If all fields are required, none has the asterisk
- If all fields are optional, none has the Optional label
- If some fields are required and some optional, **the one that has less fields gets highlighted**


![Example of a Required Field](https://paper-attachments.dropbox.com/s_C58BF0BA6B22E262734D87594EA48BFA44DEAB47CA9BE1F87EEB158A92E363A6_1554104702088_required-field.png)



## Validation

Real-time field-level validation appears as needed. Some examples are email validation and credit card format verification. Other validation happens once the user sends the form or input items.

**Error State**
When an error occurs,

- The border of the text field turns red
- An error message appears underneath the input field.

**Success State**
When the input field is validated correctly,

- The border of the text field turns green
- A success message appears underneath the input field, with the "check" icon.


![Validation states: Error, Default, Success](https://paper-attachments.dropbox.com/s_327408233EFF4365077EC98096B4D9BA485ACC65ED94F58C460043E10CA47BDC_1554428686150_image.png)




## Placeholder text

Placeholder text (also known as the html placeholder attribute) is reserved only for situations where the user may need extra help understanding what to enter. When formatting is important for validation (such as in the case of a Credit Card number or phone number), placeholder text can help guide the user. However, the field should automatically handle the addition of special characters as the user is typing so they can just focus on entering the proper digits. By having the field auto-format the content, the user can move through the form efficiently without needing extra guidance.

Placeholder text should be placed inside the field, using **$sans-font-family**, and use ******$gray-4**.


![Example of Text field with placeholder text](https://paper-attachments.dropbox.com/s_C58BF0BA6B22E262734D87594EA48BFA44DEAB47CA9BE1F87EEB158A92E363A6_1554105255789_placeholder.png)



## Masked data (For payments & password field)

Masked character will be displayed if the user is entering private or sensitive financial information such as Password (••••••••|) or Credit Card number (•••••••••••1234). Depending on the situation, it could fully or partially masked the data in the field.



# Text field typeahead

Text field typeahead is a dropdown input field that provides selectable suggestions as a user types into it. It allows users to quickly search through and select from large collections of options.

Users can also **ADD** a new value if the text that they input does not match with an existing value. For instance, they can create a new supplier right from the dropdown, which is more intuitive.

*History: We used to have a "Add New" button on the right side of the text field, which we have now removed.*


![Text field typeahead that allows users to search from existing suppliers or add a new one](https://paper-attachments.dropbox.com/s_C58BF0BA6B22E262734D87594EA48BFA44DEAB47CA9BE1F87EEB158A92E363A6_1554109190816_text-field-typeahead.png)

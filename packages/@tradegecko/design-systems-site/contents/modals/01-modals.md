# Modals

Modals appear in front of the app content to provide critical information that needs to be confirmed or ask for a decision before a user is able to proceed with the operation they intend to accomplish.


----------
## Basic Anatomy
![](https://paper-attachments.dropbox.com/s_5EA1CA8FCBE0753C88C520D89D3184741E187FBC1CDB760A2F98CE55D9093B29_1554105177476_Anatomy2x.png)


**1. Container** 
There can only be two possible container widths for Modals in-app: Basic Modal containers will have a width of 600px, whereas Large Modal containers will have a width of 880px.

**2. Overlay**
Clicking outside of the container or on the overlay dismisses the modal while staying in the same page. The same function is mirrored by the dismiss call to action in the footer actions, as well as by the dismiss ( ✖️ ) button.

**3. Modal Title**
The modal title, by default, mirrors the action that was clicked that triggered the modal. There will be cases where the header title may not necessarily reflect a call to action that was clicked. For example: navigating away through the browser buttons or gestures.

**4. Body Title (Optional)**
The body title is a succinct version of what the confirm dialogue intends to call the user’s attention on. It helps bring attention to the content of the dialogue even before the full description is read.

The Body Title is optional as there may be cases where the description is already succinct enough to be understood.

**5. Body Description**
The body description expounds on the implications of the operation that is about to be carried out.

It is encouraged to keep the text within three lines.

For Basic Modals, while the body description is left-aligned by default, the description dynamically gets **center-aligned** when two conditions are met: 


    1. If the text contains less than 75 characters, and 
    2. A Body Title is not present. 

This ensures that the space around the text is balanced with the given width of the container.

**6. Footer Actions**
The footer of the modal contains the options that the users may take to proceed with their operation. It always contains a **primary call to action**, and a **dismiss call to action** which mirrors the operation of clicking outside of the dialog container as well as by the dismiss ( ✖️ ) button.

In rare cases where there may be a secondary option, a **secondary call to action** may be placed side-by-side with the primary call to action.

In Basic modals, the dismiss call to action is always stacked below the primary and secondary calls to action.

All modals can only have up to three calls to action, including only one of each of those mentioned above.

With the exception of Quick Action Modals, Footer Action alignment for Basic Modals is always centered, with the secondary call to action inline with the primary call to action, if present, and the dismiss call to action stacked below.

Footer Action alignment for Large Modals and Quick Action Modals is always to the left, with all of the calls to action inline on the same row.

The exception for Quick Action Modals is given to respect the rules for forms where the calls to action have to be left-aligned along with the form fields.

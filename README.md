## Practical Exercises for the Script

1. Get references to all elements (input, button, list).

2. Create a function that generates an object for a single task. The task object
   should include `id`, `status` (the class will be passed here), and the task text.

3. Create the markup for a single task and insert it into the DOM. In the markup,
   the task should have an **"Edit"** button while the task is not completed. When
   the task status changes to **"Completed"**, a **"Delete"** button should appear.

4. Implement saving tasks to `localStorage`. A task collection (array of objects)
   should be created in `localStorage`.

5. Implement rendering tasks from `localStorage` on the page when it is refreshed.

6. Create a function that changes a task's status to **"Completed"**.

7. Create a function to edit a task both in the markup and in `localStorage`. When
   the **"Edit"** button is clicked, a modal window should open containing an input,
   an **"Update"** button, and a close button. Use the **basicLightbox** library for
   the modal implementation.

8. Create a function to delete a task from both `localStorage` and the markup when
   the delete button is clicked.

---

**\*** When creating or updating a task, check that the input field is filled. If
the field is empty, show a notification. You can use the **iziToast** library for
notifications.

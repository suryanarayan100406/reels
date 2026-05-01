---
nyquist_compliant: true
wave: 2
depends_on: ["03-PLAN.md"]
files_modified:
  - client/src/components/admin/ReelFormModal.jsx
  - client/src/components/admin/ReelsTable.jsx
autonomous: true
---

# Phase 6: Admin Panel UI - Plan 04 (Reel Management CRUD)

## Task 1: Reel Form Modal (Add/Edit)
<read_first>
</read_first>
<action>
1. Create `client/src/components/admin/ReelFormModal.jsx`.
2. Props: `isOpen`, `onClose`, `onSubmit`, `initialData` (if editing).
3. Fields: 
   - `instagram_url` (input type url)
   - `personal_note` (textarea, allows line breaks)
4. On submit, call `POST /api/reels` (if new) or `PUT /api/reels/:id` (if editing).
5. Handle 409 conflict errors (duplicate URL) and display a user-friendly error message.
</action>
<acceptance_criteria>
- Curator can add or edit reels via a modal form.
</acceptance_criteria>

## Task 2: Connect Form to Table
<read_first>
- client/src/components/admin/ReelsTable.jsx
</read_first>
<action>
1. Update `ReelsTable.jsx` to manage modal state (`isModalOpen`, `editingReel`).
2. Add an "Add Reel" button above the table that opens the modal with empty data.
3. Wire up the "Edit" button in the table rows to open the modal with the reel's data.
4. On modal submit success, close modal and refresh the table data.
</action>
<acceptance_criteria>
- Add and Edit flows are fully functional from the dashboard.
</acceptance_criteria>

## Task 3: Implement Delete Action
<read_first>
- client/src/components/admin/ReelsTable.jsx
</read_first>
<action>
1. Update `ReelsTable.jsx`.
2. Wire up the "Delete" button in the table rows.
3. Prompt for confirmation (`window.confirm` is fine for now).
4. On confirm, call `DELETE /api/reels/:id`.
5. On success, refresh the table data.
</action>
<acceptance_criteria>
- Reels can be deleted from the database via the dashboard.
</acceptance_criteria>

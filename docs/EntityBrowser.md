# EntityBrowser
  - A component that tabulates Entities.
  - Displays the entities passed as prop.
  - Provides a way of deleting a particular entity on displayed.
  - Provides a way of redirecting to the Entitie's Edit UI. 

  props -
   entities : Array of entities
   onEdit : A function to be called when the edit button is pressed.
   onDelete : A function to be called when the delete button is pressed.
   onRead : A function to be called when the row is clicked.
   defaultView: "collapse" only show when the View All <Entities> is clicked
                "browse" show entities by default

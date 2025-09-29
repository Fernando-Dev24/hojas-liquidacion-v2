import { handleConfirmDelete } from '@renderer/helpers'
import { Observation } from '@renderer/interfaces'
import { Evt, useUpdateForm } from '@renderer/store'
import { useState } from 'react'
import { FiChevronDown, FiChevronRight, FiPlus, FiTrash } from 'react-icons/fi'

export const Item = (data: Observation) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const { insertItem, updateItem, deleteItem } = useUpdateForm((state) => state)

  const toggleRender = () => setIsExpanded(!isExpanded)

  const handleChange = (evt: Evt) => {
    updateItem({ id: data.id, evt })
  }

  const handleDelete = () => {
    handleConfirmDelete({ id: data.id, deleteItem })
  }

  return (
    <section className="relative p-10 rounded bg-gray-50/50 border border-gray-200 shadow mb-10">
      <div className="absolute top-10 left-10 flex flex-col gap-y-5">
        <button
          type="button"
          className="p-2 rounded border border-gray-300 shadow hover:bg-gray-200 duration-150"
          onClick={toggleRender}
        >
          {isExpanded ? <FiChevronRight size={15} /> : <FiChevronDown size={15} />}
        </button>

        <button
          type="button"
          className="p-2 rounded border border-gray-300 shadow hover:bg-gray-200 duration-150"
          onClick={insertItem}
        >
          <FiPlus size={15} />
        </button>

        <button
          type="button"
          className="p-2 rounded border border-gray-300 shadow hover:bg-red-500 hover:text-white duration-150"
          onClick={handleDelete}
        >
          <FiTrash size={15} />
        </button>
      </div>

      {isExpanded ? (
        <article className="px-20">
          <div className="update-form mb-5">
            <label htmlFor="observation_place">Lugar de la observación</label>
            <input
              type="text"
              id="observation_place"
              name="observation_place"
              placeholder="Lugar de la observación"
              autoFocus
              value={data?.observation_place}
              onChange={handleChange}
            />
          </div>

          <div className="update-form mb-5">
            <label htmlFor="observation_content">Observaciones</label>
            <textarea
              className="resize-none field-sizing-content"
              id="observation_content"
              name="observation_content"
              placeholder="Escribe las observaciones"
              value={data.observation_content}
              onChange={handleChange}
            />
          </div>

          <div className="update-form mb-5">
            <label htmlFor="observation_state">Estado de la observación</label>
            <input
              type="text"
              id="observation_state"
              name="observation_state"
              placeholder="Lugar de la observación"
              value={data.observation_state}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') insertItem()
              }}
            />
          </div>
        </article>
      ) : (
        <article className="px-20">
          <div className="update-form mb-5">
            <label htmlFor="observation_place">Lugar de la observación</label>
            <input type="text" id="observation_place" placeholder="Lugar de la observación" />
          </div>
        </article>
      )}
    </section>
  )
}

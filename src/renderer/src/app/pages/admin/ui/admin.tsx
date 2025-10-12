import {
  AdminAppConfigPanel,
  AdminNavbar,
  AdminUsersPanel,
  AdminNewUserModal,
  AdminEditUserModal
} from '../../components'

export const Admin = () => {
  return (
    <>
      <section className="bg-gray-300/40">
        <section className="container pt-10 pb-50">
          <AdminNavbar />

          <article className="mb-20 grid grid-cols-[60%_minmax(40%,_1fr)_100px] gap-5">
            <AdminAppConfigPanel />
            <AdminUsersPanel />
          </article>
        </section>
      </section>

      <AdminNewUserModal id="createUserModal" />
      <AdminEditUserModal id="editUserModal" />
    </>
  )
}
